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
    return next(new httpError(err, 404));
  }
};

exports.updatePlace = async (req, res, next) => {
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
    return next(new httpError(err, 404));
  }
};

exports.deletePlace = async (req, res, next) => {
  const { pId } = req.params;

  try {
    await dummyData.filter((p) => p.id !== pId);
    res.status(200).json({
      status: "success",
      message: "place has been deleted successfully",
    });
  } catch (err) {
    return next(new httpError(err, 404));
  }
};
