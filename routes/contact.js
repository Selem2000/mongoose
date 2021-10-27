const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("test api");
});

// CURD

router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.send({ msg: "post methode", newContact });
  } catch (error) {
    res.status(400).send({ msg: "contact cannot saved" });
  }
});

router.get("/", async (req, res) => {
  try {
    const contactList = await Contact.find();
    res.send({ msg: "get all the contact", contactList });
  } catch (error) {
    res.send("faild");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const findContact = await Contact.findById(req.params.id);
    res.send({ msg: "get the contact", findContact });
  } catch (error) {
    res.send("faild");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Contact.deleteOne({ _id: req.params.id });
    res.send("delete success");
  } catch (error) {
    res.status(400).send("delete faild");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const r = await Contact.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );

    if (r.modifiedCount) {
      return res.send("updated");
    }
    res.send("no modification");
  } catch (error) {
    res.status(400).send({ msg: "faild to update", error });
  }
});

module.exports = router;
