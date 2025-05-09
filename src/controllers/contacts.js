// src/services/contacts.js
import { ContactsCollection } from '../db/models/contact.js'; // поправ шлях, якщо треба

/**
 * Отримати всі контакти з пагінацією і сортуванням
 */
export const getAllContacts = async ({ page = 1, perPage = 20, sortBy, sortOrder, userId }) => {
  const skip = (page - 1) * perPage;
  const sortOption = sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {};

  return ContactsCollection
    .find({ owner: userId })
    .sort(sortOption)
    .skip(skip)
    .limit(perPage)
    .lean();
};

/**
 * Отримати один контакт за id та owner
 */
export const getContactById = async (contactId, userId) => {
  return ContactsCollection
    .findOne({ _id: contactId, owner: userId })
    .lean();
};

/**
 * Створити новий контакт
 * @param {{ name, email, phone, photo, userId }} param0
 */
export const createContact = async ({ name, email, phone, photo, userId }) => {
  const newContact = await ContactsCollection.create({
    name,
    email,
    phone,
    photo,
    owner: userId,
  });
  return newContact.toObject();
};

/**
 * Оновити контакт за id та owner
 * @param {string} contactId 
 * @param {string} userId 
 * @param {{ name?, email?, phone?, photo? }} update 
 */
export const updateContactById = async (contactId, userId, update) => {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId, owner: userId },
    update,
    { new: true, lean: true }
  );
};

/**
 * Видалити контакт
 */
export const deleteContactById = async (contactId, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId, owner: userId }).lean();
};

export { deleteContactByIdController as removeContact };
