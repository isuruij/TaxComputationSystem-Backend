const TaxpayerRepository = require("../Repositories/TaxpayerRepository");
const JwtService = require("../Services/JwtService");

module.exports.addTaxpayer = async (data) => {
  try {
    const created = await TaxpayerRepository.addTaxpayer(data);
    if (created.status) {
      const tokenData = { id: created.id, name: data.name, role: "taxpayer" };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else if (created.message == "already registered email") {
      return { status: false, message: "already registered email" };
    } else {
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.loginTaxpayer = async (data) => {
  try {
    const avalable = await TaxpayerRepository.loginTaxpayer(data);

    if (avalable.status) {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "taxpayer",
      };
      const recived = JwtService.createToken(tokenData);

      return recived;
    } else {
      return { status: false, message: "Invalid credentials" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updateBasicDetails = async (data) => {
  try {
    const created = await TaxpayerRepository.updateBasicDetails(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getBasicDetails = async (id) => {
  try {
    const created = await TaxpayerRepository.getBasicDetails(id);
    if (created.status) {
      return { status: true, data: created.data };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.forgotPassword = async (email) => {
  try {
    const created = await TaxpayerRepository.forgotPassword(email);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.resetPassword = async (id, token) => {
  try {
    const created = await TaxpayerRepository.resetPassword(id, token);
    if (created.status) {
      return { status: true };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addNewPassword = async (id, token, newPassword) => {
  try {
    const created = await TaxpayerRepository.addNewPassword(
      id,
      token,
      newPassword
    );
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getuserincomedetails = async (id) => {
  try {
    const created = await TaxpayerRepository.getuserincomedetails(id);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updateincomedetails = async (data) => {
  try {
    const created = await TaxpayerRepository.updateincomedetails(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.verifyEmail = async (emailToken) => {
  try {
    const created = await TaxpayerRepository.verifyEmail(emailToken);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getNotifications = async (id) => {
  try {
    const created = await TaxpayerRepository.getNotifications(id);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updatePassword = async (token, data) => {
  try {
    const created = await TaxpayerRepository.updatePassword(token, data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// thimira file upload part
module.exports.fileUpload = async (userId, fileData) => {
  try {
    // Process the files as needed (e.g., save to the database)
    await TaxpayerRepository.fileUpload(userId, fileData);
  } catch (error) {
    throw new Error("Error processing files: " + error.message);
  }
};

//get tin and name
module.exports.getUserDetails = async (userId) => {
  try {
    if (!userId) {
      return { status: false };
    }
    const values = await TaxpayerRepository.getUserDetails(userId);

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
    const values = await TaxpayerRepository.getTaxCalDetails(userId);

    if (values.status) {
      return { status: true, data: values.data };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false };
  }
};

module.exports.getNotifications = async (id) => {
  try {
    const created = await TaxpayerRepository.getNotifications(id);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updateNotificationStatus = async (id) => {
  try {
    const created = await TaxpayerRepository.updateNotificationStatus(id);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};
