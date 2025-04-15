import addStudentService from '../services/addStudent.js';

const addStudent = async (req, res, next) => {
  try {
    const studentData = req.body;
    const newStudent = await addStudentService(studentData);

    res.status(201).json({
      status: 201,
      message: 'Student created',
      data: [newStudent], // завжди масив
    });
  } catch (error) {
    next(error);
  }
};

export default addStudent;
