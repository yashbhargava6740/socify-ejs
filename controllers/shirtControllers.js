const Shirt = require("../models/Shirt");

const createShirt = async (req, res) => {
  const { fabric, size, pattern, shirtColor, price } = req.body;
  if (!fabric || !size || !pattern || !shirtColor || !price)
    throw new Error("Incomplete Data");
  const shirt = await Shirt.create({
    fabric,
    size,
    pattern,
    shirtColor,
    price,
  });
  
  if (!shirt) throw new Error("Database Error!");
  else {
    res.redirect("/shirts");
  }
};

const getCreateShirt = async (req, res) => {
  res.render("shirts/new");
};

const getAllShirts = async (req, res) => {
  try {
    const shirts = await Shirt.find({});
    res.render("shirts/index", { shirts });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const editShirt = async (req, res) => {
  const { id } = req.params;

  const { fabric, size, pattern, shirtColor, price } = req.body;
  try {
    const shirt = await Shirt.findByIdAndUpdate(
      {
        _id: id,
      },
      { fabric, size, pattern, shirtColor, price }
    );
    res.redirect("/shirts");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const getEditShirt = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Shirt Id not provided");
  try {
    const shirt = await Shirt.findById({ _id: id });
    // console.log(shirt);
    res.render("shirts/edit", { shirt });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const deleteShirt = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShirt = await Shirt.findByIdAndDelete({ _id: id });
    res.redirect("/shirts");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const getShirt = async (req, res) => {
  const _id = req.params.id;
  if(!_id) {
    throw new Error("Id not provided");
    process.exit(0);
  }
  try {
    const shirt = await Shirt.findById({_id});
    if(!shirt) {
      res.status(501).send({
        message: "Requested Resource not found",
      });
      process.exit(0);
    } else {
      res.render("shirts/single_shirt", {shirt});
    }
  } catch(error) {
    res.status(500).send({
      message:error.message,
    });
  };
};
module.exports = {
  createShirt,
  getAllShirts,
  editShirt,
  deleteShirt,
  getCreateShirt,
  getEditShirt,
  getShirt,
};
