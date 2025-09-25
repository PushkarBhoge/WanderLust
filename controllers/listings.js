const Listing = require("../models/listing.js");
const NodeGeocoder = require("node-geocoder");

// Configure geocoder
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "List Does not Exist");
    return res.redirect("/listing");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = req.body.listing;
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  const fullAddress = `${newListing.location}, ${newListing.country}`;

  // Geocode the address
  const geoData = await geocoder.geocode(fullAddress);
  if (geoData && geoData.length > 0) {
    const { latitude, longitude } = geoData[0];

    // Save coordinates in the listing
    newListing.coordinates = { lat: latitude, lng: longitude };
  } else {
    console.log("Could not geocode address:", fullAddress);
  }

  await Listing.insertMany(newListing);
  req.flash("success", "Listing Added Successfully");
  res.redirect("/listing");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "List Does not Exist");
    return res.redirect("/listing");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300/w_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully");

  res.redirect(`/listing/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;

  let detetedListing = await Listing.findByIdAndDelete(id);
  console.log(detetedListing);
  req.flash("success", "Listing Delated Successfully");

  res.redirect(`/listing`);
};
