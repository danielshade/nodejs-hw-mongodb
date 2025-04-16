import Contact from '../models/contact.js';

const addContactService = async (data) => {
  const contact = await Contact.create(data);
  return contact;
};

export default addContactService;

