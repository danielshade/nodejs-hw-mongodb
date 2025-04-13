import Contact from "../models/contact.js"; // або шлях до вашої моделі

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Контакт не знайдено" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export default getContactById;
