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
      return res.json({ Status: "Success" });
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
