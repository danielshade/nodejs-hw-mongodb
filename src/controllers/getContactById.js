import getContactByIdService from '../services/getContactById.js';

export const getContactByIdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await getContactByIdService(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};