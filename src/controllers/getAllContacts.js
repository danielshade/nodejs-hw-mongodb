import getAllContactsService from '../services/getAllContacts.js';

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContactsService();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export default getAllContacts;

