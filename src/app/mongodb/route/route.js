const router = require("express").Router();
const group = require("../controller/groupController.js");
//Group Section
//Create groups
// Create document
router.post("/api/group", group.create);

// Retrieve all documents
router.get("/api/group", group.findAll);

// Retrieve single document by id
router.get("/api/group/:id", group.findOne);

// Retrieve single document by group name
router.get("/api/group/detail/:groupName", group.findGroupDetailsByGroupName);

// Update document by id
router.put("/api/group/:id", group.update);

// Delete document by id
router.delete("/api/group/:id", group.delete);

// Set all documents' done field to false
router.put("/api/group/reset/done", group.setAllDoneToFalse);

router.get(
  "/api/group/member/info/:memberCharacterName",
  group.findGroupsInfoByMemberCharacterName
);

module.exports = router;
