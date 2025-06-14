const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review");

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){           //authentication logic
      req.session.redirectUrl = req.originalUrl;   //Accessing the originalurl from req object
      req.flash("error", "You must be logged in to create listing");
    return  res.redirect("/login");
   }
   next();
};


// to save redirectUrl in local
module.exports.saveRedirectUrl = (req,res,next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// authorization for preventing edit and delete route from any other user
module.exports.isOwner = async(req,res,next) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
   if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","You are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
   }
   next();
};


//Validation for schema
module.exports.validateListing = (req,res,next)=>{
   let {error} = listingSchema.validate(req.body);
   if(error){
       let errMsg = error.details.map((el)=> el.message).join(",");
       console.log(error.details);
      throw new ExpressError(400,errMsg);
   }else{
      next();
   }
};


//Validation for Review
module.exports.validateReview = (req,res,next)=>{
   let {error} = reviewSchema.validate(req.body);
   if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400,errMsg);
   }else{
      next();
   }
};


// for protecting review - deletion
module.exports.isReviewAuthor = async(req,res,next) => {
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","You are not the author of this review");
      return res.redirect(`/listings/${id}`);
   }
   next();
};