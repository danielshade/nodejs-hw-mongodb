// src/controllers/contacts.js
import createHttpError from 'http-errors';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import { ContactsCollection } from '../db/models/contact.js';
import { getEnvVar } from '../utils/getEnvVar.js';

// Конфігурюємо Cloudinary
cloudinary.config({
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key:    getEnvVar('CLOUDINARY_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
});

// 1. Створюємо контакт (може бути з фото)
export async function createContactController(req, res, next) {
  try {
    const { path: tempPath, filename } = req.file || {};
    let photoURL = null;

    if (tempPath) {
      const uploaded = await cloudinary.uploader.upload(tempPath, {
        folder: 'contacts',
        public_id: filename,
      });
      photoURL = uploaded.secure_url;
      await fs.unlink(tempPath);
    }

    const contact = await ContactsCollection.create({
      ...req.body,
      photo: photoURL,
      owner: req.user._id,
    });

    res.status(201).json({
      status: 'success',
      data: { contact },
    });
  } catch (err) {
    next(err);
  }
}

// 2. Отримати всі контакти поточного користувача
export async function getContactsController(req, res, next) {
  try {
    const contacts = await ContactsCollection.find({ owner: req.user._id });
    res.json({ status: 'success', data: { contacts } });
  } catch (err) {
    next(err);
  }
}

// 3. Отримати контакт за ID
export async function getContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await ContactsCollection.findOne({
      _id: contactId,
      owner: req.user._id,
    });
    if (!contact) throw createHttpError(404, 'Not found');
    res.json({ status: 'success', data: { contact } });
  } catch (err) {
    next(err);
  }
}

// 4. Оновити контакт за ID (можна оновити й фото)
export async function updateContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;
    const updateData = { ...req.body };
    // Якщо прийшов файл — завантажуємо нове фото
    if (req.file?.path) {
      const { path: tempPath, filename } = req.file;
      const uploaded = await cloudinary.uploader.upload(tempPath, {
        folder: 'contacts',
        public_id: filename,
      });
      updateData.photo = uploaded.secure_url;
      await fs.unlink(tempPath);
    }

    const updated = await ContactsCollection.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      updateData,
      { new: true },
    );
    if (!updated) throw createHttpError(404, 'Not found');
    res.json({ status: 'success', data: { contact: updated } });
  } catch (err) {
    next(err);
  }
}

// 5. Видалити контакт за ID
export async function deleteContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;
    const deleted = await ContactsCollection.findOneAndDelete({
      _id: contactId,
      owner: req.user._id,
    });
    if (!deleted) throw createHttpError(404, 'Not found');
    res.json({ status: 'success', data: { message: 'contact deleted' } });
  } catch (err) {
    next(err);
  }
}
