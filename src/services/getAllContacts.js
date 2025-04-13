import Contact from '../models/contact.js';

const getAllContactsService = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error('Не вдалося отримати список контактів');
  }
};

export default getAllContactsService;
