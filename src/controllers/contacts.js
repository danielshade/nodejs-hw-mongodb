import {
  getAllContacts,
  getTotalContactsCount,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

// Отримати всі контакти з пагінацією
export const getAllContactsController = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await getAllContacts({ skip, limit: Number(limit) });
    const total = await getTotalContactsCount();
    res.json({ total, contacts });
  } catch (error) {
    next(error);
  }
};

// Отримати один контакт по ID
export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// Створити новий контакт
export const createContactController = async (req, res, next) => {
  try {
    const newContact = await createContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// Оновити контакт за ID
export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContactById(contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

// Видалити контакт
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await deleteContactById(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};
