const DataEntryService = require("../Services/DataEntryService");
const { Taxpayer } = require("../models");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async (req, res) => {
  try {
    console.log("This is data entry controller layer");

    const result = await DataEntryService.getusernames();

    console.log(result.data);
    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    }
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
