const getStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await getStudentByIdService(id);
  
      if (!student) {
        return res.status(404).json({
          status: 404,
          message: 'Student not found',
          data: []
        });
      }
  
      res.status(200).json({
        status: 200,
        message: `Successfully found student with id ${id}`,
        data: [student] // <- масив, навіть якщо один
      });
    } catch (error) {
      next(error);
    }
  };
  
  export default getStudentById;
