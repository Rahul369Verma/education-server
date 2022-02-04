const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
require ('dotenv'). config ();
// const mysql = require("mysql")

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "CRUDDatabase"
// })

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   }
//   db.query("CREATE DATABASE CRUDDatabase", (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     console.log("Database created");
//   });
//   console.log("My Sql Connected");
// })

const app = express()
app.use(cors()) //for handling cors origin handling
app.use(express.json()) // to handle coming json data from client without body-parser

const url = process.env.MONGO_URL
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const inputsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  alsoKnownAs: {
    type: String,
  },
  legalName: {
    type: String,
  },
  numberOfEmployees: {
    type: String,
  },
  companyType: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  facebookUrl: {
    type: String,
  },
  linkedInURL: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  fullDescription: {
    type: String,
  },
  addressName: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  city: {
    type: String,
  }
}, { timestamps: true })

const Input = mongoose.model('input', inputsSchema)

app.get("/", (req,res) => {
  res.send("server is running")
})//conversations = uses in database

app.post("/api/formData", (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    alsoKnownAs: req.body.alsoKnownAs,
    legalName: req.body.legalName,
    numberOfEmployees: req.body.numberOfEmployees,
    companyType: req.body.companyType,
    websiteUrl: req.body.websiteUrl,
    facebookUrl: req.body.facebookUrl,
    linkedInURL: req.body.linkedInURL,
    twitterUrl: req.body.twitterUrl,
    contactEmail: req.body.contactEmail,
    phoneNumber: req.body.phoneNumber,
    fullDescription: req.body.fullDescription,
    addressName: req.body.addressName,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    postalCode: req.body.postalCode,
    city: req.body.city
  }
  new Input(data).save((err, savedInput) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      console.log("saved in database");
      res.send("Input saved successfully")
    }
  })
})
app.get("/api/formData", (req, res) => {
  Input.find({}, (err, data) => {
    if(err){
      res.status(400).send(err)
    }else{
      res.send(data)
    }
  })
})

app.listen(process.env.PORT || 5000, console.log("server running on port 5000"))