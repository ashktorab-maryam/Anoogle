"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const PORT = 8000

const {
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    validateUser,
} = require("./handlers");

express()
    // Below are methods that are included in express(). We chain them for convenience.
    // --------------------------------------------------------------------------------

    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))

    // Nothing to modify above this line
    // ---------------------------------
    

    .get("/api/get-users", getUsers)
    .get("/api/get-user/:user", getSingleUser)

    .post("/api/add-user", addUser)

    .post("/api/signin", validateUser)

    .patch("/api/update-user", updateUser)

    .delete("/api/delete-user/:_id", deleteUser)

    // ---------------------------------
    // Nothing to modify below this line

    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins up our server and sets it to listen on port 8000.
    .listen(PORT, () => console.log(`Listening on port 8000`));



// const express = require('express')
// const PORT = 8000

// express()

//     .get('/', (req, res) => {
//         res.status(200).json({status:200, message:"Hello!"})
//     })

//     .listen(PORT, () => {
//         console.log(`Example app listening on port ${PORT}`)
//     });