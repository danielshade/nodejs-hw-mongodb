import Contact from '../models/contact.js';

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const newContact = await Contact.create({ name, email, phone });

    res.status(201).json({ data: newContact }); // ✅ Відповідь у форматі { data: {...} }
  } catch (error) {
    next(error);
  }
};

export default addContact;
