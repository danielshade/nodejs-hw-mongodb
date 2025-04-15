const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContactsService(); // Отримання всіх контактів
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts || [], // ❗️Завжди масив
    });
  } catch (error) {
    next(error);
  }

};

export default getAllContacts;

