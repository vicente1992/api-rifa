const { matchedData } = require('express-validator')

const {
  findUser,
  userIsBlocked,
  checkLoginAttemptsAndBlockExpires,
  passwordsDoNotMatch,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken,
  generateToken
} = require('./helpers')

const { handleError, } = require('../../middleware/utils')
const utils = require('../../middleware/utils/utils')
const { checkPassword, encrypt } = require('../../middleware/auth')
const { findLead } = require('../leads')


/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await findUser(data.email)
    await userIsBlocked(user)
    await checkLoginAttemptsAndBlockExpires(user)
    const isPasswordMatch = await checkPassword(data.password, user)
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch(user))
    } else {
      // all ok, register access and return token
      user.loginAttempts = 0
      await saveLoginAttemptsToDB(user)
      res.status(200).json(await saveUserAccessAndReturnToken(req, user))
    }
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * OAuth social
 */
const OAuthSocial = async (req, res) => {
  try {
    req = matchedData(req)
    let data = null;
    if (req.provider.toLowerCase() === 'facebook') {
      data = [
        'https://www.facebook.com/v6.0/dialog/oauth?',
        `client_id=${process.env.FB_ID}`,
        `&redirect_uri=${process.env.FB_REDIRECT}`,
        '&scope=email'
      ].join('');
    }

    res.status(201).json({
      data
    })

  } catch (e) {
    console.log(e)
    utils.handleError(res, { code: 422, message: 'ERROR_AUTH' })
  }
}
/**
 * Callback
 */
const cbSocial = async (req, res) => {
  try {
    req = matchedData(req)
    const data = await preSocialFb(req.code)
    if (!data.error) {
      if (req.provider.toLowerCase() === 'facebook') {
        provider = await socialFb(data.access_token)
        provider.provider = 'facebook';
        provider.authToken = data.access_token;
      }

      findLead({
        authToken: provider.authToken,
        provider: provider.provider,
        email: provider.email,
        id: provider.id
      })


      const doesExist = await utils.findByProvider(provider);

      response =
        doesExist
          ? returnRegisterToken(doesExist)
          : provider

      response = (provider && provider.error) ? {
        response: provider.error,
        code: 422
      } : {
        response,
        code: 200
      };
      res.status(response.code).json(response.response)
    } else {
      utils.handleError(res, { code: 422, message: data.error.message })
    }

  } catch (e) {
    console.log(e)
    utils.handleError(res, { code: 422, message: 'ERROR_AUTH' })
  }
}

const preSocialFb = (code) => {

  return new Promise((resolve, reject) => {
    const url = [
      'https://graph.facebook.com/v6.0/oauth/access_token?',
      `client_id=${process.env.FB_ID}`,
      `&redirect_uri=${process.env.FB_REDIRECT}`,
      `&client_secret=${process.env.FB_SK}`,
      `&code=${code}`
    ];
    fetch(url.join(''), {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
  })
}
const socialFb = token =>
  new Promise((resolve, reject) => {
    fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture.type(large)`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        json = {
          ...json, ...{
            photoUrl: json.picture.data.url
          }
        }
        resolve(json)
      })
  })


/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 */
const returnRegisterToken = (userInfo) => {
  const data = {
    token: generateToken(userInfo._id),
    user: userInfo
  }
  return data
}

module.exports = { login, OAuthSocial, cbSocial }
