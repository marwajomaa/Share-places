const httpError = require("../models/http-error");

const dummyData = [
  {
    id: "p1",
    address: "jfhlzf",
    decription: "sdjzhglkjgflFJBSL",
    creator: "u1",
  },
];

exports.getPlaceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const place = dummyData.find((p) => p.id === id);

    if (!place) {
      return next(
        new httpError("Could not find place for the provided id", 404)
      );
    }
    res.status(200).json({
      status: "success",
      message: `places middleware runs for ${id}`,
      data: place,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPlaceByUSerId = async (req, res, next) => {
  try {
    const { uId } = req.params;
    const place = dummyData.find((p) => p.creator === uId);

    if (!place) {
      return next(
        new httpError("Could not find place for the provided user id", 404)
      );
    }
    res.json({
      status: "success",
      message: `places middleware runs for ${uId}`,
      data: place,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createPlace = async (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: Math.random(),
    title,
    description,
    address,
    creator,
    location: coordinates,
  };
  try {
    await dummyData.push(createdPlace);
    res.status(200).json({
      status: "success",
      message: "place has been added successfully",
      data: { place: createdPlace },
    });
  } catch (err) {
    return next(new httpError("something wrong in adding new place", 404));
  }
};
