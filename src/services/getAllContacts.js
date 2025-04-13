import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  return Contact.find();
};
