/**
 * Checks if a string is literally 'true' or 'false' and returns the proper boolean value
 * @param {string} val
 * @return {boolean}
 */
export const getBool = (val) => {
  return !!JSON.parse(String(val).toLowerCase());
}

/**
 * Attempts to clean up and format phone numbers in a standard way
 * @param {string|number} number
 * @return {string} formatted (###) ###-####
 */
export const formatPhoneNumber = (number) => {
  const cleaned = ('' + number).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

/**
 * Validate UUID format
 * @param {string} uuid - example is '8b36b0c8-69d0-4042-ae02-03e795b2f0f8'
 * @return {boolean}
 */
export const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid)
}

/**
 * Validate UserId
 * @param {string} id - safe characters only, between 1 and 20 characters long
 * @return {boolean}
 */
export const isValidUserId = (id) => {
  const userIdRegex = /[A-Za-z0-9._~()'!*:@,;+?-]{1,20}/;
  return userIdRegex.test(id)
}

/**
 * Create UUIDs 
 * @return {string} Unique UUID
 */
export const createUUID = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => {
    const crypto = window.crypto || window.msCrypto
    //eslint-disable-next-line
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  })
}

/**
 * Create a random string of text
 * @param {number} length 
 * @return {string} a string of random text (no spaces)
 */
export const randomString = (length) => [...Array(length)].map(i=>(~~(Math.random()*36)).toString(36)).join('')

/**
 * Create a random number
 * @param {number} digits - Maximum number of place values
 * @return {number}
 */
const randomNum = (digits = 1) => Math.floor(Math.random() * (Math.pow(10,Math.abs(digits)))) + 1

/**
 * Consolidates arrays within an object
 * @example
 * // returns [24,35,46,26,4,15]
 * flatArray({open:[24,35],pending:[46,26],closed:[4,15]})
 * @param {Object} object - Object to find arrays within
 * @return {Array}
 */
export const flatArray = (object) => Object.keys(object).reduce((arr,key) => {
  if(Array.isArray(object[key])) {
    return arr.concat(...object[key])
  }
  return arr
},[])

/**
 * Matches a user's role to a database table or database query. Only used for JSON Server api calls on dev environment.
 * @param {string} role - User role to match to database name
 * @param {boolean} [list] - group ends in 's' or 'Id'
 * @returns {string}
 */
export const getUserGroup = (role, list = true) => {
  const suffix = list ? 's' : 'Id'
  switch(role) {
    case 'PPE_PARTICIPANT':
      return `patient${suffix}`
    case 'PPE_PROVIDER':
      return `provider${suffix}`
    case 'PPE_CRC':
      return `crc${suffix}`
    case 'PPE_BSSC':
      return `bssc${suffix}`
    case 'PPE_MOCHA_ADMIN':
      return `mochaAdmin${suffix}`
    case 'PPE_ADMIN':
      return `admin${suffix}`
    default:
      return `patient${suffix}`
  }
}

/**
 * Flatten a multidimensional/deep object 
 * @example
 * // returns {red.0: "apple", red.1: "button", orange.food.0: "juice", orange.food.1: "orange"}
 * flattenObject({
 *  red:['apple','button'],
 *  orange:{
 *    food:['juice','orange']
 *  }
 * })
 * @param {Object} obj - The deep object to be flattened
 * @param {string} parent - The parent name prepended to key names (used recursively)
 * @param {string} [delimiter] - defaults to '.' | The text used to seperate parent and child keys
 * @returns {Object}
 */
export const flattenObject = (obj,parent,delimiter = '.') => {
  const flattened = {}
  Object.keys(obj).forEach((key) => {
    const refKey = parent ? parent + delimiter + key : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key],refKey,delimiter))
    } else {
      flattened[refKey] = obj[key]
    }
  })

  return flattened
}

/**
 * Convert all values in an object into a single string. Works recursively
 * @example
 * // return "Jim | Joe | Jane | Jack | Jill | "
 * objectValuesToString({boss:'Jim',manager:'Joe',coworkers:['Jane','Jack','Jill']})
 * @param {Object} obj - The object to convert
 * @param {Array} [ignore] - Keys to ignore
 * @param {*} [divider] - Join object values. Default values is ' | '
 * @returns {string} 
 */
export const objectValuesToString = (obj, ignore = [], divider = ' | ') => {

  let out = ''
  Object.keys(obj).map((key) => {
    const exit = ignore.some(ignoreKey => ignoreKey === key)
    if (exit) {
      return null
    }
    else {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return out += objectValuesToString(obj[key],ignore)
      } else {
        return out += obj[key].replace(/<[/]*?([a-z]+).*? *[/]*?>/g,' ') + divider
      }
    }
  })

  return out
}

/**
 * Create a new popup window with a specified url and optional window settings. 
 * 
 * This is a glorified wrapper around window.open to allow for custom defaults and will function similarly, 
 * including returning the window object representing the popup. This can be used for testing against 
 * it's existence (for example using a setinterval to check if it still exists and executing a callback 
 * and clearing the interval when it no longer does).
 * 
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/open for all available settings and
 * browser compatibility issues.
 * 
 * Defaults are: {
        height: 400,
        width: 500,
        toolbar: 'no',
        status: 'no',
        directories: 'no',
        menubar: 'no',
        scrollbars: 'yes',
        resizable: 'no',
        centerscreen: 'yes',
        chrome: 'yes',        
    }
    Top and left are calculated to make the window appear at the center of it's parent window.
 * 
 * 
 * @param {string} url
 * @param {object} [customOptions={}]
 * @return {object} Window object
 */
export const newWindow = (url, customOptions = {}) => {
  if(typeof url !== 'string' || url === '') {
      throw new Error('Invalid input provided. Need URL to be a valid string.');
  }
  // Allow either an empty object or null to be passed to signify no custom options
  customOptions = customOptions !== null ? customOptions : {};

  const height = customOptions.height || 400;
  const width = customOptions.width || 500;
  const left = (window.outerWidth / 2) + (window.screenX || window.screenLeft || 0) - (width / 2);
  const top = (window.outerHeight / 2) + (window.screenY || window.screenTop || 0) - (height / 2);

  const defaultOptions = {
      left,
      top,
      height,
      width,
      toolbar: 'no',
      status: 'no',
      directories: 'no',
      menubar: 'no',
      scrollbars: 'yes',
      resizable: 'no',
      centerscreen: 'yes',
      chrome: 'yes',        
  };

  const options = Object.assign({}, defaultOptions, customOptions)
  const optionsString = Object.entries(options)
                              .map(([feature, setting]) => `${feature}=${setting}`)
                              .join(', ');

  const openWindow = window.open(url, '', optionsString)

  return openWindow;
}

/**
 * Callback for check_webp_feature
 * @callback webp_cb
 * @param {string} feature - forwards the feature argument
 * @param {string} result - will be passed back the detection result (in an asynchronous way!)
 */
/**
 * Check which webp image features are supported by the browser
 * @param {string} feature - Can be one of 'lossy', 'lossless', 'alpha' or 'animation'
 * @param {webp_cb} callback - callback with requested feature and the result
 */
export const check_webp_feature = (feature, callback) => {
  const kTestImages = {
      lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
      lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
      alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
      animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  };
  const img = new Image();
  img.onload = function () {
      var result = (img.width > 0) && (img.height > 0);
      callback(feature, result);
  };
  img.onerror = function () {
      callback(feature, false);
  };
  img.src = "data:image/webp;base64," + kTestImages[feature];
}

/**
 * Convert camel case strings to hyphenated lowercase strings
 * 
 * @param {string} string - camel cased string to convert
 * @return {string}
 */
export const convertToKebab = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Convert hyphenated strings to camel case strings
 * 
 * @param {string} string - hyphenated string to convert
 * @param {boolean} pascal - capitalize the first letter in the string
 * @return {string}
 */
export const convertToCamel = (string, pascal = false) => {
	const converter = (matches) => matches[1].toUpperCase();
	let result = string.replace(/(-\w)/g, converter);

	if ( pascal === true ) {
		result = result.charAt(0).toUpperCase() + result.slice(1);
	}

	return result;
}

/**
 * Autodetect string conversion from camel case to hyphenated and vice versa
 * 
 * @param {string} string - string to convert
 * @param {boolean} pascal - capitalize the first letter in the string
 * @return {string}
 */
export const caseConverter = (string, pascal = false) => {
	if (string.match(/(-\w)/)) {
    return convertToCamel(string, pascal)
  } else if (string.match(/([a-z])([A-Z])/g)) {
    return convertToKebab(string)
  } else {
    return string;
  }
}

/**
 * A default tracking function
 * 
 * @param {object} e - event object
 */
export const trackFallback = (e) => console.log('track event', e)