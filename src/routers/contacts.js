import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  deleteContactByIdController
} from '../controllers/contacts.js';
import { contactCreateSchema, contactUpdateSchema } from '../schemas/contactSchemas.js';

const router = express.Router();
router.use(authenticate);

router.get('/', controllerWrapper(getContactsController));
router.get('/:contactId', controllerWrapper(getContactByIdController));
router.post('/', upload.single('photo'), validateBody(contactCreateSchema), controllerWrapper(createContactController));
router.patch('/:contactId', upload.single('photo'), validateBody(contactUpdateSchema), controllerWrapper(updateContactByIdController));
router.delete('/:contactId', controllerWrapper(deleteContactByIdController));

export default router;
