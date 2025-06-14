const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
     .then(()=>{
        console.log("Connected to DB");
     })
     .catch((err)=>{
        console.log(err);
     });

async function main(){
   await mongoose.connect(Mongo_URL);
}

//create a function to access all data 
const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner : "683fcc276e3401920a85f672"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();