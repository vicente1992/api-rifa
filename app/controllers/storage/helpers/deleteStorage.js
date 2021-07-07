const util = require('util');
const fs = require('fs')
const unlink = util.promisify(fs.unlink);
const path = require('path')

const delefile = (file = '') => {
  try {
    const pathImg = path.join(__dirname, `../../../../public/storage/${file}`);
    unlink(`${pathImg}`)
    console.log('File removed')
  } catch (err) {
    console.error(err)
  }
}

module.exports = { delefile }
