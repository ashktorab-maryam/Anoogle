"use strict";
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const sendResponse= (res, status, data, message = "nothing")=>{
    return res.status(status).json({status, data,message})

}

// use this data. Changes will persist until the server (backend) restarts.
const { user } = require("./data");


// returns all user
const getUsers = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ANOOGLE");
    const result = await db.collection("SignInUser").find().toArray();
    result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "No reservation Found" });
    client.close();
};

// returns a single user
const getSingleUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ANOOGLE");
    const _id  = req.params.user 
    console.log(_id)
    const result = await db.collection("SignInUser").findOne({_id });
    console.log(result);
    result
    ? res.status(200).json({ status: 200, data: result, message:"reservation Found"})
    : res.status(404).json({ status: 404, message: "No single reservation Found" });

client.close();
};

// creates a new user
const addUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
    await client.connect();
    const db = client.db("ANOOGLE");
    console.log("connected!");
    const result = await db.collection("SignInUser").insertOne(req.body);
    console.log(req.body);
    res.status(201).json({ status: 201, data: req.body,message: "reservation success" });
    }
catch (err) {
    console.log(err.stack);
    res.status(400).json({ status: 400, data: req.body, message: "failed reservation" });
}
    client.close();
    console.log("disconnected!");
};

// // updates an existing user
const updateUser = async (req, res) => {
    const { _id, givenName, surname, email } = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ANOOGLE");
    const query={_id: ObjectId(_id)};
    const newValues = { $set: { givenName, surname, email } };

let isMissing = false
if(!givenName || !email)
{
    isMissing =true
    delete req.body._id
    res.status(404).json({status:404, message:"seat not available",data: req.body});
}
else{
    const updateReservation = await db.collection("SignInUser").updateOne(query, newValues);
    updateReservation.acknowledged && res.status(200).json({ status: 200,message: "success" ,updatedTo: req.body  });
}
client.close()

}


// deletes a specified user
const deleteUser = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    try {
    await client.connect();
    const db = client.db("ANOOGLE");
    const _id = req.params._id 
    console.log("connected!");
    const result = await db.collection("SignInUser").deleteOne({ _id: ObjectId(_id) });
    console.log(req.body);
    res.status(201).json({ status: 204, data: req.body });
    }
catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
}
    client.close();
    console.log("disconnected!");
};


module.exports = {
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
};