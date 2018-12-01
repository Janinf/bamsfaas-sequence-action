'use strict';

/**
 * 
 * @param {number} status HTTP status code
 * @param {string} message Error message
 * @returns {{err: status: number, message: string}} Error object
 */
const buildError = (status, message) => ({err: {status, message}})

/**
 * 
 * @param {(function(*, *): *)} handle Actual handler function for openwhisk action
 * @returns {(function(*): *)} Handler function in format openwhisk expects it
 */
const action = handle => async params => {
  if (params.err) return {err: {...params.err}}

  try {
    const {locals} = params
    delete params.locals
    const result = await handle(params, locals ? locals : {})
    if (locals) result.locals = {...locals, ...result.locals}

    return result
  } catch(e) {
    console.error(e)
    return buildError(500, e.message)
  }
}

module.exports = {buildError, action}
