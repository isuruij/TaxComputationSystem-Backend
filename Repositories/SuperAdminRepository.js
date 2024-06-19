const { Policies } = require("../models");

module.exports.createPolicy = async (data) => {
  try {
    console.log(data);
    await Policies.create({
      title: data.title,
      amount: data.amount,
      rate: data.rate,
      optional: data.optional
    });

    return { status: true };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { status: false, message: error.message };
  }
};

module.exports.updatePolicy = async (obj) => {
  try {
    const { policyId, title, amount, rate } = obj;

    // Find the policy by ID
    const policy = await Policies.findByPk(policyId);

    if (!policy) {
      return { status: false, message: "Policy not found" };
    }

    // Update the policy fields
    policy.title = title;
    policy.amount = amount;
    policy.rate = rate;

    // Save the updated policy
    await policy.save();

    return { status: true };
  } catch (error) {
    console.error("Error updating policy:", error);
    return { status: false, error: error.message };
  }
};

module.exports.deletePolicy = async (data) => {
  try {
    // Find the policy by policyId
    const policy = await Policies.findOne({ where: { policyId: data.policyId } });

    // Check if the policy exists
    if (!policy) { 
      return { status: false, message: "Policy not found" };
    }

    // Check if the policy is optional
    if (!policy.optional) {
      console.log("-----------------------------")
      return { status: false, message: "Policy is not optional and cannot be deleted" };
    }

    // Delete the policy
    await Policies.destroy({ where: { policyId: data.policyId } });

    return { status: true };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { status: false, message: `Error: ${error.message}` };
  }
};


module.exports.optionalpolicy = async () => {
  try {
    // Query the database for records matching the given parameters
    const types = await Policies.findAll({
      where: {
        optional: true,
      },
    });
    return { status: true, data: types };
  } catch (error) {
    console.error(`Error in repository: ${error.message}`);
    return { status: false, message: error.message };
  }
};

module.exports.policy = async () => {
  try {
    // Query the database for records matching the given parameters
    const types = await Policies.findAll({
      where: {
        optional: false,
      },
    });
    return { status: true, data: types };
  } catch (error) {
    console.error(`Error in repository: ${error.message}`);
    return { status: false, message: error.message };
  }
};


module.exports.updateoptionalpolicy = async (obj) => {
  try {
    const { policyId, title, amount, rate } = obj;

    // Find the policy by ID
    const policy = await Policies.findByPk(policyId);

    if (!policy) {
      return { status: false, message: "Policy not found" };
    }

    // Update the policy fields
    policy.title = title;
    policy.amount = amount;
    policy.rate = rate;

    // Save the updated policy
    await policy.save();

    return { status: true };
  } catch (error) {
    console.error("Error updating policy:", error);
    return { status: false, error: error.message };
  }
};