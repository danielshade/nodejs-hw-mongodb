import getAllContactsService from '../services/getAllContacts.js';

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContactsService();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllContacts;
