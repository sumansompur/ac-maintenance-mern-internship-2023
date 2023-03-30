const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointments");

router.get("/appointment", async (req, res) => {
  try {
    const appointments = await Appointment.find({ active: true });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/appointment", async (req, res) => {
  const appoint = new Appointment({
    client_username: req.body.username,
    phone_number: req.body.phno,
    address: req.body.address,
    serviceDate: new Date(req.body.prDate),
    serviceType: req.body.serviceType,
    active: req.body.active,
  });
  try {
    const exist = await Appointment.findOne({
      username: req.body.username,
      serviceDate: new Date(req.body.prDate),
      serviceType: req.body.serviceType,
    });
    if (exist)
      return res.status(400).json({ message: "Appointment already exists" });

    const newAppoint = await appoint.save();
    console.log("New appointment created");
    res.status(201).json(newAppoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/appointment/id", getAppointment, (req, res) => {
  res.send(res.appoint);
});
router.get("/appointment/user", getUserAppointment, (req, res) => {
  res.send(res.appoint);
});

router.put("/appointment/id", getAppointment, async (req, res) => {
  try {
    const updates = {
      phone_number: req.body.phno,
      address: req.body.address,
      pref_date: new Date(req.body.prDate),
      active: req.body.active,
    };
    let updateAppoint = await res.appoint.updateOne(updates);
    res.status(201).json(updateAppoint);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put("/appointment", async (req, res) => {
  try {
    const newAppoint = await appoint.save();
    console.log("New appointment created");
    res.status(201).json(newAppoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/appointment/complete/", getAppointment, async (req, res) => {
  try {
    const updateAppoint = await res.appoint.updateOne({ active: "false" });
    console.log("Appointment marked as inactive");
    res.status(201).json({ message: "Appointment marked as inactive" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/appointment/id", getAppointment, async (req, res) => {
  try {
    await Appointment.deleteOne(res.user);
    res.json({
      message: "Appointment Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

async function getAppointment(req, res, next) {
  let appoint = null;
  let id = req.headers.id;
  try {
    appoint = await Appointment.findOne({ _id: id });
    if (appoint == null) {
      return res.status(404).json({ message: "Cannot find such user" });
    }
  } catch (error) {
    res.status(500).json({ message: console.error.message });
  }
  res.appoint = appoint;
  next();
}
async function getUserAppointment(req, res, next) {
  let appoint = null;
  let username = req.headers.username;
  try {
    appoint = await Appointment.find({
      client_username: username,
      active: "true",
    }).sort({
      serviceDate: 1,
    });
    if (appoint == null) {
      return res.status(404).send([]);
    }
  } catch (error) {
    res.status(500).json({ message: console.error.message });
  }
  res.appoint = appoint;
  next();
}

module.exports = router;
