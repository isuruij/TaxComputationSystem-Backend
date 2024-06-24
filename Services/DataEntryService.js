const DataEntryRepository = require("../Repositories/DataEntryRepository");
const { Taxpayer } = require("../models");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async () => {
  try {
    const userarray = await DataEntryRepository.getusernames();
    if (userarray.status) {
      return { status: true, data: userarray.data };
    } else {
      console.log(userarray.message);
    }
  } catch (error) {
    return { status: false };
  }
};

// dataentry data enter part
module.exports.postTaxDetails = async (data) => {
  try {
    const result = await DataEntryRepository.postTaxDetails(data);
    if (result.status) {
      return { status: true };
    }
    return { message: "Database not succussfully updated" };
  } catch (error) {
    return { status: false };
  }
};

//get submisssions in to dataentry submission dashboard
module.exports.getUserSubmission = async () => {
  try {
    const submissionarray = await DataEntryRepository.getUserSubmission();
    if (submissionarray.status) {
      return { status: true, data: submissionarray.data };
    } else {
      console.log(submissionarray.message);
    }
  } catch (error) {
    return { status: false };
  }
};

//get tin and name
module.exports.getUserDetails = async (userId) => {
  try {
    if (!userId) {
      return { status: false };
    }
    const values = await DataEntryRepository.getUserDetails(userId);

    if (values.status) {
      return { status: true, data: values.data };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false };
  }
};

//get tax calculations(under development)
module.exports.getTaxCalDetails = async (userId) => {
  try {
    if (!userId) {
      return { status: false };
    }
    const values = await DataEntryRepository.getTaxCalDetails(userId);

    if (values.status) {
      return { status: true, data: values.data, data2: values.data2 };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false };
  }
};

//file upload part
module.exports.fileUpload = async (userId, fileData) => {
  try {
    // Process the files as needed (e.g., save to the database)
    await DataEntryRepository.fileUpload(userId, fileData);
  } catch (error) {
    throw new Error("Error processing files: " + error.message);
  }
};
