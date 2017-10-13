import Alipay from '../index';
import QueryString from 'query-string';

// 与RSA签名工具的计算结果进行比对
// https://docs.open.alipay.com/291/106097
test('signature verification', () => {

  var params = {
    app_id: 2183,
    biz_content: '{"scopes":["auth_base"],"state":"init"}',
    method: 'alipay.user.info.auth',
    subject: ' 测试内容`-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?   ',
    body: '',
    timestamp: '2017-10-13 00:00:00',
    version: '1.0',
  };
  var privateKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKi/2yd6a4nJFUbPe9+Akf7Ve3WSVpMx7msObiFoAASReZ3kMGhNXLsYCz8mhh3XzhkM8cXE++ZnQ2wYKISPTbs3NVhrFc3jOkncxD+ADGV5k394+VrH+sih/Nnw6ATuD923wnMgAhtDUkz5n1NrlHhHOJthox6a0OXrHuXK+Q3rAgMBAAECgYBGzSB9Qt7l06mKqTk3ADHBMv72yGxsm9GFt2s7tu/y+rqFJZ2t1W+nzCHD4Dz7PnVpi0XRjaGG/SKLsuMlIx8gVEqubndAXoRbazzUn2b4ZDHmvhj73OFdszL4RV21VJ/AH0erGAID6cNN1LcvMZD15I0p+r8rndUxx69HpmHZCQJBANPtQCss/VX1X8PLiexAJ1AGuNQWNOak3vC3goDn1gZnWKqTthM3Siy5kPunmfOOz3qW+Sm5xv6DTEjkfo1SVDcCQQDL1+RTaGIeFMXBMYobNTKUOO4B2ewJrJWlFkZLYl7UizuFHghcyJ7METObrkTCeT11Vtv4Rohzi5TEATCHSiHtAkBUXFT22undldeRMSyuBrufd42Ln2tfhLHaULJ6bc8crXb2L+aCr7evJg84nfcCpQ6iVgbJPVKhbdKoEYzu5J7xAkEAyukEQra0fMcmtxIuLLk+uOcWnMclu9eNOsE6hg3M4fwa6n6jymB2GiLBYaYOkhuHvwcQfksPxxzZoGaivPlhXQJBAJQV9dsUfqkYk6/jVKLe1I9NDgR+A7pHVBIQ2TXKIFGnidXGcuvyvUjYhLI4quwemSTq77T/m3zcToiu5JRcLb8=';
  var sign = 'Wc1HtMjDwLbWaGEhAzl6qaoHw01m5OpKAIAQxxJyCEjMyJ1bIwMlalB9ZJ09N8Fh3Df3T3qab2D3fI70Xaypo6xCECX0p9QvTMiPmSfzQQ5q21g/kpCseiQQcTe35BO96ufREGkFkDI8xQH+LsG6PLk6akxV8Ujdl47igYljdWk=';

  var signedQuery = Alipay.sign(params, privateKey);
  expect(QueryString.parse(signedQuery).sign).toBe(sign);

});
