// src/controllers/contacts.js
import createHttpError from 'http-errors';
// src/controllers/contacts.js
import Contact from '../db/models/contact.js';

/**
 * GET /contacts
 * Повертає усі контакти користувача
 */
export async function getAllContacts(req, res, next) {
  try {
    const userId = req.user.id;
    const contacts = await Contact.find({ owner: userId }).lean();
    res.json({ data: contacts });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /contacts/:id
 * Повертає контакт за ID
 */
export async function getContactById(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const contact = await Contact.findOne({ _id: id, owner: userId }).lean();
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({ data: contact });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /contacts
 * Створює новий контакт
 */
export async function createContact(req, res, next) {
  try {
    const userId = req.user.id;
    const newContact = await Contact.create({ ...req.body, owner: userId });
    res.status(201).json({ data: newContact });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /contacts/:id
 * Оновлює контакт за ID
 */
export async function updateContact(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updated = await Contact.findOneAndUpdate(
      { _id: id, owner: userId },
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!updated) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /contacts/:id
 * Видаляє контакт за ID
 */
export async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = await Contact.findOneAndDelete({ _id: id, owner: userId });
    if (!deleted) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
