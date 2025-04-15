import express from 'express';
import addStudent from '../controllers/addStudent.js';

const router = express.Router();

router.post('/', addStudent); // ← це має бути

export default router;
