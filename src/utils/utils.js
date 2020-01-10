export const getBool = (val) => {
  return !!JSON.parse(String(val).toLowerCase());
}

export const formatPhoneNumber = (number) => {
  const cleaned = ('' + number).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

export const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid)
}

export const isValidUserId = (id) => {
  const userIdRegex = /[a-zA-Z0-9]{8}/;
  return userIdRegex.test(id)
}

export const createUUID = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    //eslint-disable-next-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export const randomString = (length) => [...Array(length)].map(i=>(~~(Math.random()*36)).toString(36)).join('')

export const flatArray = (object) => Object.keys(object).reduce((arr,key) => {
  if(Array.isArray(object[key])) {
    return arr.concat(...object[key])
  }
  return arr
},[])

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

export const objectValuesToString = (obj, ignore, divider = ' | ') => {

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
        return out += obj[key].replace(/<[\/]*?([a-z]+).*? *[\/]*?>/g,' ') + divider
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

// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, isSupported)' will be passed back the detection result (in an asynchronous way!)
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