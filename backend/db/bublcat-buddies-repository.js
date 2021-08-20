const {BublcatBuddy} = require('./models')

async function deleteBuddy(buddyId){
    const buddy = await BublcatBuddy.findByPk(buddyId);
    if (!buddy) throw new Error('Cannot find buddy');

    await BublcatBuddy.destroy({ where: { id: buddy.id }});
    return buddy.id;
  }

module.exports={
    deleteBuddy
};
