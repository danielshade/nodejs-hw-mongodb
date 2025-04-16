import Contact from '../models/contact.js';

const getAllContactsService = async () => {
  const contacts = await Contact.find(); 
  return contacts;
};

export default getAllContactsService;
