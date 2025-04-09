import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.error('Error getting contacts:', error);
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await ContactsCollection.findById(contactId);
    if (!contact) {
      console.log(`Contact with id ${contactId} not found in database`);
      return null;
    }
    return contact;
  } catch (error) {
    console.error('Error getting contact:', error);
    throw error;
  }
};
