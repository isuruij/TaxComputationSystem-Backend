const SuperAdminRepository = require("../Repositories/SuperAdminRepository");
const DataEntryRepository = require("../Repositories/DataEntryRepository");
const JwtService = require("../Services/JwtService");

module.exports.addSuperAdmin = async (data) => {
  try {
    if (data.adminType === "superadmin" || data.adminType == undefined) {
      const created = await SuperAdminRepository.addSuperAdmin(data);
      if (created.status) {
        const tokenData = {
          id: created.id,
          name: data.name,
          role: "superAdmin",
        };
        const recived = JwtService.createToken(tokenData);
        return recived;
      } else if (created.message == "already registered user") {
        return { status: false, message: "already registered user" };
      } else {
        return created;
      }
    } else {
      const created = await DataEntryRepository.addSecondAdmin(data);
      if (created.status) {
        const tokenData = {
          id: created.id,
          name: data.name,
          role: "superAdmin",
        };
        const recived = JwtService.createToken(tokenData);
        return recived;
      } else if (created.message == "already registered user") {
        return { status: false, message: "already registered user" };
      } else {
        return created;
      }
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addFirstAdmin = async (data) => {
  try {
    const created = await SuperAdminRepository.addFirstAdmin(data);
    if (created.status) {
      const tokenData = {
        id: created.id,
        name: data.name,
        role: "superAdmin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.loginSuperAdmin = async (data) => {
  try {
    const avalable = await SuperAdminRepository.loginSuperAdmin(data);
    if (avalable.status && avalable.type === "superAdmin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "superAdmin",
      };
      const recived = JwtService.createToken(tokenData);

      return recived;
    } else if (avalable.status && avalable.type === "secondAdmin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "secondAdmin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};
