
const fs = require('fs')
const deleteFile = (routerFileDelete) => new Promise((resolve, reject) => {
  fs.unlink(`${routerFileDelete}`, (err) => {
    if (err) {
      reject(err)
    }
  })
  resolve('OK')
})


module.exports = {
  deleteFile
}
