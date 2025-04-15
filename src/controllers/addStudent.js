import addStudentService from '../services/addStudent.js';

const addStudent = async (req, res, next) => {
  try {
    const newStudent = await addStudentService(req.body);
    res.status(201).json({
      status: 201,
      message: 'Student successfully created',
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

export default addStudent;
