import createHttpError from 'http-errors';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import { ContactsCollection } from '../db/models/contact.js';
import { getEnvVar } from '../utils/getEnvVar.js';

cloudinary.v2.config({
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
});

export async function createContactController(req, res) {
  const { path: tempPath, filename } = req.file || {};
  let photoURL = null;

  if (tempPath) {
    const uploaded = await cloudinary.v2.uploader.upload(tempPath, {
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
}
// …інші контролери точно як в Оксани
