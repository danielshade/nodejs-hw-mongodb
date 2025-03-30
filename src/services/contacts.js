import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (id) => {
  return await ContactsCollection.findById(id);
};

export const postContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

export const patchContact = async (id, payload) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
  };
};

export const deleteContact = async (id) => {
  return ContactsCollection.findOneAndDelete({ _id: id });
};
