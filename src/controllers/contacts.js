// src/controllers/contacts.js
import createHttpError from 'http-errors';

import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContactById,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

/**
 * GET /contacts
 */
export async function getContactsController(req, res, next) {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId: req.user._id,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /contacts/:contactId
 */
export async function getContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /contacts
 */
export async function createContactController(req, res, next) {
  try {
    // обробка фото, якщо є
    let imageUrl = null;
    if (req.file) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      if (useCloudinary) {
        const uploaded = await saveFileToCloudinary(req.file.path);
        imageUrl = uploaded.secure_url;
      } else {
        imageUrl = await saveFileToUploadDir(req.file, 'contacts');
      }
    }

    const newContact = await createContact({
      ...req.body,
      photo: imageUrl,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Contact created successfully!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /contacts/:contactId
 */
export async function updateContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;

    // обробка нового фото, якщо є
    let imageUrl = null;
    if (req.file) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      if (useCloudinary) {
        const uploaded = await saveFileToCloudinary(req.file.path);
        imageUrl = uploaded.secure_url;
      } else {
        imageUrl = await saveFileToUploadDir(req.file, 'contacts');
      }
    }

    const updated = await updateContactById(
      contactId,
      { ...req.body, photo: imageUrl },
      req.user._id
    );

    if (!updated) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Contact updated successfully!',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /contacts/:contactId
 */
export async function deleteContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;
    const deleted = await deleteContactById(contactId, req.user._id);

    if (!deleted) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Contact deleted successfully!',
    });
  } catch (err) {
    next(err);
  }
}
