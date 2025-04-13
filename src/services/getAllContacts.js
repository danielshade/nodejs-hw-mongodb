import getAllContactsService from '../services/getAllContacts.js';


export const getAllContacts = async () => {
  return Contact.find();
};
