import { NativeModules } from 'react-native';
import { Buffer } from 'buffer';
import RSASign from 'jsrsasign';

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

  // Create signature
  let alg = {RSA: 'SHA1withRSA', RSA2: 'SHA256withRSA'}[object.sign_type];
  let sig = new RSASign.KJUR.crypto.Signature({alg});
  sig.init(RSASign.KEYUTIL.getKey(privateKey));
  sig.updateString(sortedQuery);
  let sign = Buffer.from(sig.sign(), 'hex').toString('base64');

  sortedQuery += `&sign=${encodeURIComponent(sign)}`;
  return sortedQuery;
}

export default Alipay;