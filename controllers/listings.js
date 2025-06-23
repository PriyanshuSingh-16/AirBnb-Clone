const Listing = require('../models/listing.js');
const mapToken = process.env.MAP_TOKEN;
module.exports.index =  async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", 
            populate: { path: "author", },
        }).populate("owner");
    if(!listing) {
        req.flash("error", "Listing Your Requested For Does Not Exist !");
        res.redirect("/listings") 
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    // Use MapTiler Geocoding API
    const geocodeUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(req.body.listing.location)}.json?key=${mapToken}`;
    
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; 
    newListing.image = { url, filename };
    
    if (data.features && data.features.length > 0) {
        newListing.geometry = data.features[0].geometry;
    }
    
    let geoData = await newListing.save();
    console.log(geoData);
    req.flash("success", "New Listing Created!"); 
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing Your Requested For Does Not Exist !");
        res.redirect("/listings") 
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/c_scale,h_250,w_370/");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Updated Listing !"); 
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Deleted Listing !"); 
    res.redirect("/listings");
};