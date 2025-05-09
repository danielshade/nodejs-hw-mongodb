import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById
} from '../services/contacts.js';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts({
    page: req.query.page,
    perPage: req.query.perPage,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder,
    userId: req.user._id,
  });
  res.json({ status: 200, message: 'Successfully found contacts!', data: contacts });
}

export async function getContactByIdController(req, res) {
  const contact = await getContactById(req.params.contactId, req.user._id);
  if (!contact) throw createHttpError(404, 'Contact not found');
  res.json({ status: 200, message: 'Successfully found contact!', data: contact });
}

export async function createContactController(req, res) {
  let photoUrl;
  if (req.file) {
    photoUrl = getEnvVar('ENABLE_CLOUDINARY') === 'true'
      ? await saveFileToCloudinary(req.file)
      : await saveFileToUploadDir(req.file);
  }
  const newContact = await createContact({ ...req.body, photo: photoUrl, userId: req.user._id });
  res.status(201).json({ status: 201, message: 'Successfully created a contact!', data: newContact });
}

export async function updateContactByIdController(req, res) {
  let photoUrl;
  if (req.file) {
    photoUrl = getEnvVar('ENABLE_CLOUDINARY') === 'true'
      ? await saveFileToCloudinary(req.file)
      : await saveFileToUploadDir(req.file);
  }
  const updated = await updateContactById(req.params.contactId, req.user._id, { ...req.body, photo: photoUrl });
  if (!updated) throw createHttpError(404, 'Contact not found');
  res.json({ status: 200, message: 'Successfully patched a contact!', data: updated });
}

export async function deleteContactByIdController(req, res) {
  const deleted = await deleteContactById(req.params.contactId, req.user._id);
  if (!deleted) throw createHttpError(404, 'Contact not found');
  res.sendStatus(204);
}
