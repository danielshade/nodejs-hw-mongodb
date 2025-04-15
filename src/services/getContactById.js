import Contact from '../models/contact.js';

const getContactByIdService = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact; 
  } catch (error) {
    throw new Error('Помилка при пошуку контакту');
  }
};

export default getContactByIdService;
