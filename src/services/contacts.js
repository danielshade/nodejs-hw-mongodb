export const getAllContacts = ({ skip = 0, limit = 10 }) => {
  return Contact.find().skip(skip).limit(limit);
};

export const getTotalContactsCount = () => Contact.countDocuments();

export const getContactById = async (id) => {
  return Contact.findById(id);
};

export const createContact = async (data) => {
  return Contact.create(data);
};

export const updateContactById = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

export const deleteContactById = async (id) => {
  return Contact.findByIdAndDelete(id);
};
