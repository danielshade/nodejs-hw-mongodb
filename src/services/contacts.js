import { ContactsCollection } from '../db/models/contact.js';

/**
 * Pagination, sorting, filtering omitted for brevity
 */
export async function getAllContacts({ page = 1, perPage = 20, sortBy, sortOrder, userId }) {
  const skip = (page - 1) * perPage;
  const sortOption = sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {};
  return ContactsCollection.find({ owner: userId }).sort(sortOption).skip(skip).limit(perPage).lean();
}

export async function getContactById(contactId, userId) {
  return ContactsCollection.findOne({ _id: contactId, owner: userId }).lean();
}

export async function createContact({ name, email, phone, photo, userId }) {
  const newContact = await ContactsCollection.create({ name, email, phone, photo, owner: userId });
  return newContact.toObject();
}

export async function updateContactById(contactId, userId, update) {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId, owner: userId },
    update,
    { new: true, lean: true }
  );
}

export async function deleteContactById(contactId, userId) {
  return ContactsCollection.findOneAndDelete({ _id: contactId, owner: userId }).lean();
}
