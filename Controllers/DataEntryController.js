const DataEntryService = require("../Services/DataEntryService");
const { Taxpayer } = require("../models");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async (req, res) => {
  try {
    const result = await DataEntryService.getusernames();

    console.log(result.data);
    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    } else {
      console.log(result.status, result.data);
    }
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// dataentry data enter part
module.exports.postTaxDetails = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }

    const result = await DataEntryService.postTaxDetails(req.body);
    if (result.status) {
      console.log(result.status);
      return res.json({ Status: "Data uploaded Successfully" });
    } else {
      console.log(result.message);
      return res.json({ Status: "Failed", Message: result.message });
    }
  } catch (error) {
    console.error("Error updating tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// getUserSubmission
module.exports.getUserSubmission = async (req, res) => {
  try {
    const submissions = await DataEntryService.getUserSubmission();

    console.log(submissions.data);
    if (submissions.status) {
      return res.json({ Status: "Success", Data: submissions.data });
    } else {
      console.log(submissions.status, submissions.data);
    }
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get name and tin
module.exports.getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const result = await DataEntryService.getUserDetails(id);
    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    } else {
      return res.status(400).json({ Status: "NotSuccess" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//get tax calculations(under development)
module.exports.getTaxCalDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await DataEntryService.getTaxCalDetails(id);
    if (result.status) {
      return res.json({
        Status: "Success",
        Data: result.data,
        Data2: result.data2,
      });
    } else {
      return res.status(400).json({ Status: "NotSuccess" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Doc upload part
module.exports.fileUpload = async (req, res) => {
  try {
    const userId = req.params.userId;
    const files = req.files;
    const ids = req.body.fileIds;

    // Check if no files were uploaded
    if (!files || files.length === 0) {
      return res.status(400).json({ Status: "No files selected" });
    }

    // Ensure ids is an array even if there's only one ID
    const idsArray = Array.isArray(ids) ? ids : [ids];

    // Combine files and their respective IDs
    const fileData = files.map((file, index) => ({
      ...file,
      id: idsArray[index],
    }));

    // Call the service to handle the file data
    await DataEntryService.fileUpload(userId, fileData);

    // Respond to the client
    return res.json({ Status: "Files uploaded successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error uploading files" });
  }
};
