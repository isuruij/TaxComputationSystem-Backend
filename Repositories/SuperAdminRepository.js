const bcrypt = require("bcrypt");
const { SuperAdmin, SecondAdmin, Notification } = require("../models");
const jwt = require("jsonwebtoken");

module.exports.addSuperAdmin = async (obj) => {
  try {
    const existingUser1 = await SuperAdmin.findOne({
      where: { userName: obj.userName },
    });
    const existingUser2 = await SecondAdmin.findOne({
      where: { userName: obj.userName },
    });

    if (existingUser1 || existingUser2) {
      return { status: false, message: "already registered user" };
    }
    const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    const res = await SuperAdmin.create(data);

    return { status: true, id: res.dataValues.id };
  } catch (error) {
    return { status: false };
  }
};

module.exports.addFirstAdmin = async (obj) => {
  try {
    const count = await SuperAdmin.count();
    if(count==0){
      const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
      var data = obj;
      data.password = hashedPw;
      data.password = obj.password;
      const res = await SuperAdmin.create(data);
  
      return { status: true, id: res.dataValues.id };
    }else{
      return { status: false , message:"user exist"};
    }

  } catch (error) {
    return { status: false };
  }
};

module.exports.loginSuperAdmin = async (obj) => {
  try {
    const superAdmin = await SuperAdmin.findOne({
      where: {
        userName: obj.userName,
      },
    });


    if (superAdmin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        superAdmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        
        return {
          status: true,
          name: superAdmin.dataValues.name,
          id: superAdmin.dataValues.id,
          type:"superAdmin"
        };
      }
    }

    const secondAdmin = await SecondAdmin.findOne({
      where: {
        userName: obj.userName,
      },
    });

    if (secondAdmin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        secondAdmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        return {
          status: true,
          name: secondAdmin.dataValues.name,
          id: secondAdmin.dataValues.id,
          type:"secondAdmin"
        };
      }
    }
    
    return { status: false, message: "Admin not found" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
