const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { createItem } = require('../../middleware/db')
const mime = require('mime')
const sharp = require('sharp');
const { deleteFile, handleError } = require('../../middleware/utils');
const router = '/public/storage/'
const Storage = require('../../models/storage')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createStorage = async (req, res) => {
  try {


    if (!req.files) {
      return handleError(res, { code: 400, message: 'No files were uploaded.' })
    }
    const file = req.files.file
    let objectFile = {}
    if (file.mimetype.includes('image')) { // Check is image
      objectFile = await saveImage(file)
    }
    objectFile.mimetype = mime.getType(file.name)

    const response = await createItem(objectFile, Storage)
    res.status(201).json({ url: response.originalPath })
  } catch (error) {
    handleError(res, error)
  }
}

const saveImage = (file) => new Promise(async (resolve) => {
  const filesWebp = {}
  filesWebp.fileName = `${uuidv4()}.jpeg`
  filesWebp.fileType = '.jpeg'
  const pathOriginal = `.${router}${filesWebp.fileName}`
  const successWrite = await writeOriginImage(file, pathOriginal)

  if (successWrite) {
    filesWebp.originalPath = await compressImage(pathOriginal, `original_${filesWebp.fileName}`)
    // filesWebp.smallPath = await compressImage(pathOriginal, `small_${filesWebp.fileName}`, 200)
    // filesWebp.mediumPath = await compressImage(pathOriginal, `medium_${filesWebp.fileName}`, 600)
    // filesWebp.largePath = await compressImage(pathOriginal, `large_${filesWebp.fileName}`, 1000)
    await deleteFile(pathOriginal)
    resolve(filesWebp)
  }
})
const writeOriginImage = (file, pathFile) => new Promise((resolve) => {
  fs.writeFile(pathFile, file.data, (err) => {
    if (err) {
      console.log(err)
      resolve(false)
    } else {
      console.log('Se guardo la imagen')
      resolve(true)
    }
  })
})
const compressImage = (pathInPut, name = '', size = null) => new Promise((resolve, reject) => {
  try {
    const relativePath = `${name}`
    const pathOutPut = `${process.cwd()}${router}${relativePath}`
    sharp(pathInPut)
      .jpeg({ quality: 85 })
      .resize(size, size)
      .toFile(pathOutPut, (err) => {
        if (!err) {
          resolve(relativePath)
        } else {
          reject(err)
        }
      })
  } catch (e) {
    reject(e)
  }
})


module.exports = {
  createStorage
}
