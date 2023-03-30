const express = require("express");
const router = express.Router();
const Contact = require("../models/contactRequests");

router.get("/contact-requests", async (req, res) => {
  try {
    const contacts = await Contact.find({ contacted: "false" });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ server: error.message });
  }
});

router.put("/contact-requests/contacted", async (req, res) => {
  const id = req.headers.id;
  try {
    const request = await Contact.findById(id);
    await request.updateOne({ contacted: "true" });
    console.log("Contact customer marked as contacted");
    res.status(201).json({ message: "Contact me customer as contacted" });
  } catch (error) {
    res.status(500).json({ server: error.message });
  }
});

router.post("/contact-requests", async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    subject: req.body.subject,
    contacted: req.body.contacted,
  });
  try {
    const exist = await Contact.findOne({
      email: req.body.email,
      contacted: "false",
    });
    if (exist)
      return res.status(400).json({
        server:
          "Your request has already been recieved. We'll contact you shortly!",
      });
    const newContact = await contact.save();
    console.log("New contact request created");
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ server: error.message });
  }
});

module.exports = router;
