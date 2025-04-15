import express from 'express';
import addStudent from '../controllers/addStudent.js';

const router = express.Router();

router.post('/', addStudent); // POST /students

export default router;
