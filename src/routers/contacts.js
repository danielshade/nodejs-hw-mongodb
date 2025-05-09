 import express from 'express';
 import ctrlWrapper from '../utils/ctrlWrapper.js';
 import {
   getAllContacts,
   getContactById,
   createContact,
   updateContact,
   removeContact,
 } from '../controllers/contacts.js';
  import { upload } from '../middlewares/multer.js';

 const router = express.Router();

 router.get('/', ctrlWrapper(getAllContacts));
 router.get('/:contactId', ctrlWrapper(getContactById));

 router.post(
   '/',
  upload.single('photo'),
   ctrlWrapper(createContact)
 );

 router.delete('/:contactId', ctrlWrapper(removeContact));

 router.patch(
   '/:contactId',
  upload.single('photo'),
   ctrlWrapper(updateContact)
 );

 export default router;
