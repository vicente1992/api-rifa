const slug = require('slug')
const createSlug = (name = '') => {
  return slug(name)
}

module.exports = { createSlug }
