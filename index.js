const express = require("express");
const app = express();
app.use(express.json());

const port = 5060;

const FORM = require("./routes");
const mongoose = require("mongoose");

const async = require("async");

const formModel = require("./models/form_model");
const countryModel = require("./models/country");
const stateModel = require("./models/states");
const cityModel = require("./models/city");

app.use("/form", FORM);

const MongoDB = require("./services/databaseServices");
const { mongo } = require("mongoose");

MongoDB.start();
app.post("/form", async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let country = req.body.country;
  let state = req.body.state;
  let city = req.body.city;
  let gender = req.body.gender;
  let dateOfBirth = req.body.date;
  let monthOfBirth = req.body.month;
  let yearOfBirths = req.body.year;
  let age;

  if (
    firstName.match(/^[a-zA-Z]+$/) &&
    lastName.match(/^[a-zA-Z]+$/) &&
    email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  ) {
    console.log(firstName);
  } else {
    res.send({ result: "unprocessable entity" });
  }
  const date = new Date();
  let year = date.getFullYear();
  console.log(year);
  if (yearOfBirths) {
    age = year - yearOfBirths;
  }
  if (age > 18) {
    console.log("age"+age);
  }

  console.log(yearOfBirths);

  console.log(age);

  const data = new formModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    country: country,
    state: state,
    city: city,
    gender: gender,
    dateOfBirth: dateOfBirth,
    monthOfBirth: monthOfBirth,
    yearOfBirth: yearOfBirths,
    age: age,
  });

  // const model = new user({email: 'some@gmail.com'});
  const val = await data.save();

  res.send({ result: val });
});

app.get("/form-data", (req, res) => {
  async.auto(
    {
      forms: function (cb) {
        formModel.find().exec(function (err, forms) {
          if (err) {
            return cb("Unable to fetch");
          }
          console.log(forms);
          return cb(null, forms);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.forms });
    }
  );
});

app.get("/countries", (req, res) => {
  async.auto(
    {
      countrys: function (cb) {
        countryModel.find().exec(function (err, countrys) {
          if (err) {
            return cb("Unable to fetch");
          }
          console.log(countrys);
          return cb(null, countrys);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.countrys });
    }
  );
});

app.get("/states", (req, res) => {
  const country_id = req.query.countrys;
  console.log(country_id);
  // db.states.find({countrys: country _id}) =>
  // countirs = [{id: '', country: 'sdfsdg', cities: []}, {id: '', country: 'gfhjt', cities: []}]
  // states id
  async.auto(
    {
      states: function (cb) {
        stateModel.find({ country: country_id }).exec(function (err, states) {
          if (err) {
            return cb("Unable to fetch");
          }
          console.log(states);
          return cb(null, states);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.states });
    }
  );
});

app.get("/citys", (req, res) => {
  const city_id = req.query.citys;
  console.log(city_id);
  // db.states.find({countrys: country _id}) =>
  // countirs = [{id: '', country: 'sdfsdg', cities: []}, {id: '', country: 'gfhjt', cities: []}]
  // states id
  async.auto(
    {
      citys: function (cb) {
        cityModel.find({ state: city_id }).exec(function (err, citys) {
          if (err) {
            return cb("Unable to fetch");
          }
          console.log(citys);
          return cb(null, citys);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.citys });
    }
  );
});

app.listen(port, () => {
  console.log(`App is listening at localhost:${port}`);
});
