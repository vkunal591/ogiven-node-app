const {  Career } = require("../models");

const addCareer = async (req, res, next) => {
  try {
    const { name,email,phone,resume,role,coverLatter } = req.body;
   

    const isCareerExist = await Career.findOne({ email });
    if (isCareerExist) {
      res.code = 400;
      throw new Error("already exist");
    }

    const newCareer = new Career({ name,email,phone,resume,role,coverLatter});
    await newCareer.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};


const deleteCareer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const career = await Career.findById(id);
    if (!career) {
      res.code = 404;
      throw new Error("Not found");
    }

    await Career.findByIdAndDelete(id);

    res.status(200).json({
      code: 200,
      staus: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getCareers = async (req, res, next) => {
  try {
    const { role, size, page } = req.query;
    let query = {};

    const sizeNumber = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;

    if (role) {
      const search = RegExp(role, "i");

      query = { $or: [{ role: search }] };
    }

    const total = await Career.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const career = await Career.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ _id: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get career list successfully",
      details: { career, total, pages },
    });
  } catch (error) {
    next(error);
  }
};

const getCareer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const career = await Career.findById(id);
    if (!career) {
      res.code = 404;
      throw new Error("Not found");
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get career successfully",
      details: { career },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCareer,
  deleteCareer,
  getCareer,
  getCareers,
};
