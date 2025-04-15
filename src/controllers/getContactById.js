import getContactByIdService from '../services/getContactById.js';

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactByIdService(id);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}`,
      data: [contact], // ❗️Обертаємо в масив
    });
    
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default getContactById;
