import { NativeModules } from 'react-native';
import Crypto from 'browserify-sign';

const { Alipay } = NativeModules;

Alipay.sign = (object, privateKey) => {

  // Add default sign_type
  if (!object.sign_type || object.sign_type.length === 0) {
    object.sign_type = 'RSA';
  }

  // Remove sign field
  delete object.sign;

  // Remove empty field
  Object.keys(object).forEach((key) => {
    if (String(object[key]).length === 0) {
      delete object[key];
    }
  })

  // Sort query string
  var sortedQuery = '';
  let sortedKeys = Object.keys(object).sort((a, b) => a > b);
  for (var i = 0; i < sortedKeys.length; i++) {
    let key = sortedKeys[i];
    let value = object[key];
    sortedQuery += `${(i === 0) ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }

  // Add header & footer to private key
  if (privateKey.indexOf('PRIVATE KEY') === -1) {
    privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
  }

  // Create signature
  let algorithm = {RSA: 'RSA-SHA1', RSA2: 'RSA-SHA256'}[object.sign_type];
  let sign = Crypto.createSign(algorithm)
    .update(sortedQuery)
    .sign(privateKey, 'base64');

  sortedQuery += `&sign=${encodeURIComponent(sign)}`;
  return sortedQuery;
}

export default Alipay;