import { getAllContactsService } from '../services/getAllContacts.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContactsService();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
