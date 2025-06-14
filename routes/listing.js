const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });


//Using Router.route() method to compact the code of same route

router.route("/")
.get( wrapAsync(listingController.index)) //Index Route -> to see all lists
 .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing)); //Create Route -> create a listing

 //  .post(upload.single("listing[image]"), (req,res)=>{
//    res.send(req.file);
//  });

//New & Route -> to add a new listing
router.get("/new",isLoggedIn,listingController.renderNewform);


router.route("/:id")
   .get(wrapAsync(listingController.showListing)) //Show Route -> to see all the data of a specific listing
   .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing)) //Update Route
   .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing)); //Destroy or Delete Route


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));










module.exports = router;