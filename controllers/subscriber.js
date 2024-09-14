const { Subscriber } = require("../models");

const addSubscriber = async (req, res, next) => {
  try {
    const { email } = req.body;
   

    const isSubscriberExist = await Subscriber.findOne({ email });
    if (isSubscriberExist) {
      res.code = 400;
      throw new Error("already exist");
    }

    const newSubscriber = new Subscriber({ email});
    console.log(newSubscriber)
    await newSubscriber.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};


const deleteSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subscriber = await Subscriber.findById(id);
    if (!subscriber) {
      res.code = 404;
      throw new Error("Not found");
    }

    await Subscriber.findByIdAndDelete(id);

    res.status(200).json({
      code: 200,
      staus: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getSubscribers = async (req, res, next) => {
  try {
    const { email, size, page } = req.query;
    let query = {};

    const sizeNumber = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;

    if (email) {
      const search = RegExp(email, "i");

      query = { $or: [{ email: search }] };
    }

    const total = await Subscriber.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const subscriber = await Subscriber.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ _id: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get subscriber list successfully",
      details: { subscriber, total, pages },
    });
  } catch (error) {
    next(error);
  }
};

const getSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subscriber = await Subscriber.findById(id);
    if (!subscriber) {
      res.code = 404;
      throw new Error("Not found");
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get subscriber successfully",
      details: { subscriber },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSubscriber,
  deleteSubscriber,
  getSubscriber,
  getSubscribers,
};
