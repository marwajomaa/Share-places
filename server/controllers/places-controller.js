const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Place = require("../models/place");
const mongoose = require("mongoose");
const User = require("../models/user");

exports.getPlaceById = async (req, res, next) => {
  try {
    const { pId: id } = req.params;
    const place = await Place.findById(id);

    if (!place) {
      return next(
        new HttpError("Could not find place for the provided id", 404)
      );
    }

    res.status(200).json({
      status: "success",
      message: `place with the provided id founded`,
      place: place,
    });
  } catch (err) {
    return next(new HttpError(err, 404));
  }
};

exports.getPlacesByUSerId = async (req, res, next) => {
  try {
    const { uId: id } = req.params;

    const places = await Place.find({ creator: id });

    if (!places) {
      return next(
        new HttpError("Could not find place for the provided user id", 404)
      );
    }

    res.json({
      status: "success",
      message: `places with the provided user id founded`,
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

  //check for creator
  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Creating place failed, please try again", 500));
  }

  if (!user) {
    return next(new HttpError("could not find the user for the provided id"));
  }

  try {
    const place = new Place({
      title,
      description,
      address,
      creator,
      image,
      location,
    });
    //user founded then create place and add place id to user(creator) using trans
    const sess = await mongoose.startSession();
    sess.startTransaction();
    //save place
    const createdPlace = await place.save({ session: sess });
    //add place id to user(creator)document
    await user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();

    res.status(200).json({
      status: "success",
      message: "place has been added successfully",
      place: createdPlace,
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
  const { pId: id } = req.params;

  const { title, description } = req.body;
  const place = {
    title,
    description,
  };
  try {
    const updatedPlace = await Place.findByIdAndUpdate(id, place);

    res.status(200).json({
      status: "success",
      message: "place has been updated successfully",
      data: { place: updatedPlace },
    });
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }
};

exports.deletePlace = async (req, res, next) => {
  const { pId: id } = req.params;

  let place;

  try {
    place = await Place.findById(id).populate("creator");
  } catch (err) {
    return next(
      new HttpError("Something wrong happened, please try again", 404)
    );
  }

  if (!place) {
    return next(new HttpError("Could not find the place for this id", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete the place", 500)
    );
  }
  res.status(200).json({
    status: "success",
    message: "place has been deleted successfully",
  });
};
