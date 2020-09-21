const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Place = require("../models/place");

let dummyData = [
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
        new HttpError("Could not find place for the provided id", 404)
      );
    }
    res.status(200).json({
      status: "success",
      message: `places middleware runs for ${id}`,
      data: place,
    });
  } catch (err) {
    return next(new HttpError(err, 404));
  }
};

exports.getPlacesByUSerId = async (req, res, next) => {
  try {
    const { uId } = req.params;
    const places = dummyData.filter((p) => p.creator === uId);

    if (!places) {
      return next(
        new HttpError("Could not find place for the provided user id", 404)
      );
    }
    res.json({
      status: "success",
      message: `places middleware runs for ${uId}`,
      data: places,
    });
  } catch (err) {
    return next(new HttpError(err, 404));
  }
};

exports.createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed. please check your data", 422)
    );
  }

  const { title, description, location, image, address, creator } = req.body;
  const place = {
    title,
    description,
    address,
    creator,
    image,
    location,
  };
  try {
    const createdPlace = await new Place(place);
    await createdPlace.save();

    res.status(200).json({
      status: "success",
      message: "place has been added successfully",
      data: { place: createdPlace },
    });
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }
};

exports.updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed. please check your data", 422)
    );
  }
  const { pid } = req.params;
  const { title, description } = req.body;
  const updatedPlace = {
    title,
    description,
  };
  try {
    const updatedPlace = await { ...dummyData.find((p) => p.id === pid) };
    const placeIndex = await { ...dummyData.findIndex((p) => p.id === pid) };

    updatedPlace.title = title;
    updatedPlace.description = description;

    dummyData[placeIndex] = updatedPlace;

    res.status(200).json({
      status: "success",
      message: "place has been updated successfully",
      data: { place: updatedPlace },
    });
  } catch (err) {
    return next(new HttpError(err, 404));
  }
};

exports.deletePlace = async (req, res, next) => {
  const { pId } = req.params;

  if (!dummyData.find((p) => p.id === pId)) {
    return next(new HttpError("Could not find a place for that id", 404));
  }

  try {
    dummyData = await dummyData.filter((p) => p.id !== pId);
    res.status(200).json({
      status: "success",
      message: "place has been deleted successfully",
    });
  } catch (err) {
    return next(new HttpError(err, 404));
  }
};
