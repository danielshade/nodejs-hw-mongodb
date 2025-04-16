import addContactService from '../services/addContact.js';

const addContact = async (req, res, next) => {
  try {
    const contactData = req.body;
    const newContact = await addContactService(contactData);

    res.status(201).json({
      status: 201,
      message: 'Contact created',
      data: [newContact], // завжди масив
    });
  } catch (error) {
    next(error);
  }
};

export default addContact;
