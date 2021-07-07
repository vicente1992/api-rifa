
/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const orderExists = (data = [], tickect = {}) => {
  // return new Promise((resolve, reject) => {

  const dataTickect = [];
  data.forEach(e => {
    dataTickect.push(e.tickects)
  });
  const allTickects = dataTickect.flat();
  return allTickects;

}

module.exports = { orderExists }
