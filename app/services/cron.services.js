const cron = require('node-cron');
const Tickect = require('../models/tickect');


const updateTickects = async () => {

  try {
    await Tickect.updateMany({ status: 'inprogress' }, { $set: { status: "cancel" } });
    console.log('tickects updated')
  } catch (error) {
    console.log(error)
  }

}

//Cron se ejecutara todos cada 5 minutos
cron.schedule("5 * * * *", () => {
  updateTickects();
  console.log('pasaron 5 minutos')
})
