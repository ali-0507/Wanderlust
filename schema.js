const Joi = require("joi");

module.exports.listingSchema = Joi.object({  //iss joi k andar object aana chahiye or obj ka naam hoga that suppose to be listing
    listing : Joi.object({               //iss listing obj k andar or bhi parameters honge...schema valiadtion k acc obj honi chahiye and wo required hona chahiye
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("",null),
    }).required(),                   
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required(),
});