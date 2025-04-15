import Student from '../models/student.js';

const addStudentService = async (data) => {
  const student = await Student.create(data);
  return student;
};

export default addStudentService;
