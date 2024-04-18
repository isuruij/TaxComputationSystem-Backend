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

module.exports.loginSuperAdmin = async (data) => {
  try {
    const avalable = await SuperAdminRepository.loginSuperAdmin(data);
    if (avalable.status && avalable.type === "superAdmin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "superAdmin"
      };
      const recived =await JwtService.createToken(tokenData);
      const { token } = await recived;
      console.log(recived);
      console.log(recived.status);
      console.log(token);

      return {status:true, token: token, type: "superAdmin" };
    } else if (avalable.status && avalable.type === "secondAdmin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "secondAdmin"
      };
      const recived = JwtService.createToken(tokenData);
      const token = recived.token

      return {status:true, token: token, type: "secondAdmin" };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};
