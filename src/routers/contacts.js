// src/routers/contacts.js
import { Router }                    from 'express';
import { authenticate }              from '../middlewares/authenticate.js';
import { validateBody }              from '../middlewares/validateBody.js';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

const router = Router();

// всі ендпоінти під авторизацією
router.use(authenticate);

router
  .route('/')
  .get(getAllContacts)
  .post(validateBody(createContact), createContact);

router
  .route('/:id')
  .get(getContactById)
  .patch(validateBody(updateContact), updateContact)
  .delete(deleteContact);

export default router;
