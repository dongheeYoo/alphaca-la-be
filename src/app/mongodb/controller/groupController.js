const db = require("../model/index.js");
const Group = db.group;

// Create document
exports.create = (req, res) => {
  // TODO: Validate request attirbutes
  //   if (!req.body.title) {
  //     res.status(400).send({
  //       message: "Title is empty!",
  //     });

  //     return;
  //   }

  // Set document
  const group = new Group({
    name: req.body.name,
    raid: req.body.raid,
    difficulty: req.body.difficulty,
    done: req.body.done,
    member: req.body.member,
  });

  // Save document
  Group.create(group)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Create Group failure.",
      });
    });
};

// Retrieve all documents
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  // Retrieve all documents
  Group.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Retrieve document failure.",
      });
    });
};

// Retrieve single document
exports.findOne = (req, res) => {
  const id = req.params.id;

  // Retrieve single document by id
  Group.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot find document. (id: " + id + ")",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Retrieve single document failure. (id: " + id + ")",
      });
    });
};

// Update document by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Update document by id
  Group.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update document. (id: " + id + ")",
        });
      } else {
        res.send({
          message: "Document updated.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Update document failure. (id: " + id + ")",
      });
    });
};

// Delete document by id
exports.delete = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Delete document by id
  Group.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot delete document. (id: " + id + ")",
        });
      } else {
        res.send({
          message: "Document deleted.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Delete document failure. (id: " + id + ")",
      });
    });
};

// Set all documents' done field to false
exports.setAllDoneToFalse = (req, res) => {
  // Update all documents
  Group.updateMany({}, { $set: { done: false } })
    .then(() => {
      res.send({ message: "All documents' done field set to false." });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Failed to set all documents' done field to false.",
      });
    });
};
