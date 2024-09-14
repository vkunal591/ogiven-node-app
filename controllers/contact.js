const { Contact } = require("../models");

const addContact = async (req, res, next) => {
  try {
    const { name,email,phone,subject,desc } = req.body;
   

    const isContactExist = await Contact.findOne({ email });
    if (isContactExist) {
      res.code = 400;
      throw new Error("already exist");
    }

    const newContact = new Contact({ name,email,phone,subject,desc});
    console.log(newContact)
    await newContact.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};


const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      res.code = 404;
      throw new Error("Not found");
    }

    await Contact.findByIdAndDelete(id);

    res.status(200).json({
      code: 200,
      staus: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const { subject, size, page } = req.query;
    let query = {};

    const sizeNumber = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;

    if (subject) {
      const search = RegExp(subject, "i");

      query = { $or: [{ subject: search }] };
    }

    const total = await Contact.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const contact = await Contact.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ _id: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get contact list successfully",
      details: { contact, total, pages },
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      res.code = 404;
      throw new Error("Not found");
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get contact successfully",
      details: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
  deleteContact,
  getContact,
  getContacts,
};
