import Alipay from '../index';
import QueryString from 'query-string';

// 与RSA签名工具的计算结果进行比对
// https://docs.open.alipay.com/291/106097

test('signature verification (RSA, PKCS#8)', () => {

  let params = {
    app_id: 2183,
    biz_content: '{"scopes":["auth_base"],"state":"init"}',
    method: 'alipay.user.info.auth',
    subject: ' 测试内容`-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?   ',
    body: '',
    sign_type: 'RSA',
    timestamp: '2017-10-13 00:00:00',
    version: '1.0',
  };
  let privateKey = '-----BEGIN PRIVATE KEY-----\nMIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKi/2yd6a4nJFUbPe9+Akf7Ve3WSVpMx7msObiFoAASReZ3kMGhNXLsYCz8mhh3XzhkM8cXE++ZnQ2wYKISPTbs3NVhrFc3jOkncxD+ADGV5k394+VrH+sih/Nnw6ATuD923wnMgAhtDUkz5n1NrlHhHOJthox6a0OXrHuXK+Q3rAgMBAAECgYBGzSB9Qt7l06mKqTk3ADHBMv72yGxsm9GFt2s7tu/y+rqFJZ2t1W+nzCHD4Dz7PnVpi0XRjaGG/SKLsuMlIx8gVEqubndAXoRbazzUn2b4ZDHmvhj73OFdszL4RV21VJ/AH0erGAID6cNN1LcvMZD15I0p+r8rndUxx69HpmHZCQJBANPtQCss/VX1X8PLiexAJ1AGuNQWNOak3vC3goDn1gZnWKqTthM3Siy5kPunmfOOz3qW+Sm5xv6DTEjkfo1SVDcCQQDL1+RTaGIeFMXBMYobNTKUOO4B2ewJrJWlFkZLYl7UizuFHghcyJ7METObrkTCeT11Vtv4Rohzi5TEATCHSiHtAkBUXFT22undldeRMSyuBrufd42Ln2tfhLHaULJ6bc8crXb2L+aCr7evJg84nfcCpQ6iVgbJPVKhbdKoEYzu5J7xAkEAyukEQra0fMcmtxIuLLk+uOcWnMclu9eNOsE6hg3M4fwa6n6jymB2GiLBYaYOkhuHvwcQfksPxxzZoGaivPlhXQJBAJQV9dsUfqkYk6/jVKLe1I9NDgR+A7pHVBIQ2TXKIFGnidXGcuvyvUjYhLI4quwemSTq77T/m3zcToiu5JRcLb8=\n-----END PRIVATE KEY-----';
  let sign = 'Wc1HtMjDwLbWaGEhAzl6qaoHw01m5OpKAIAQxxJyCEjMyJ1bIwMlalB9ZJ09N8Fh3Df3T3qab2D3fI70Xaypo6xCECX0p9QvTMiPmSfzQQ5q21g/kpCseiQQcTe35BO96ufREGkFkDI8xQH+LsG6PLk6akxV8Ujdl47igYljdWk=';

  let signedQuery = Alipay.sign(params, privateKey);
  expect(QueryString.parse(signedQuery).sign).toBe(sign);

});

test('signature verification (RSA2, PKCS#1)', () => {

  let params = {
    app_id: 2183,
    biz_content: '{"scopes":["auth_base"],"state":"init"}',
    method: 'alipay.user.info.auth',
    subject: ' 测试内容`-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?   ',
    body: '',
    sign_type: 'RSA2',
    timestamp: '2017-10-13 00:00:00',
    version: '1.0',
  };
  let privateKey = '-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDFe4S+eaRM61dNmTdCz7+Z6ZjZDI4DqSJV0slLoWTnRiKF7oMRHV4VdazkYAsjfmIU40TCY+vzGC5s+yVAjD/geDP65YzhPvO6vS4Lc4Dff8Yo2A8Opzz7hN8VSzJFuYhXDRfWVc01tAnLitAlOGBJJ+cDHg43JdYGGOok62/z2wIDAQABAoGAcU8c7DlZVzUVQ5Xsyi3vTr1kkO0OMvWBmOK30uhIwBZSyqv+kfxatk9tox+kZHoohrmcAzlX8YRnZup3BmEyaHKCiH/XovZEWT4FAHe0JNUVvSLv/3mqRoj44KXtJiWiJReHW+9P3FVX9i5fbrqgoJM5Shj6NgT/UhkuZxDaBDkCQQD7yt+cO11l8RMdBoBYsPtqRrMHJrSvjlDJwzg6NLHZIUWybNluZiD95mu56p+B48eDqA/hdwLxrZKaDdJTcYOdAkEAyMhQ4gpmfE+bzDNKZaJgRDzNSXnOwq8YLk96MhJjnAxy5OaPr5lhbdelS7xAcPz6ansxEJhvqcGrraQ+ZIun1wJBAKaL4W6Aod2tIPxg8YI4xoPcccy4IGnC09MxCr8NXdoGNQi5EPUCHq5yvCzEcW9EEBMYljCHPO5I5iB6JfXFrs0CQHTbWW/lu7Y4IyYa5/71HXA5rwVHlpXqkHlLmoQP/ddxy2D7676412K1sqe8ngjkw947atgM0FiNtpyuTf345isCQQCj/KflLqM7Po5q41nR7P3YpeumElgK5mPJAKn5azqUaWOK8IDDv8lxjq9wQp+lEYRpSdDMF+Y6ld9yOX8vDw36\n-----END RSA PRIVATE KEY-----';
  let sign = 'MHuhxBxM+3ZSW4Mm4jmG2fqYCJgSlvBNqaDIYyfW4L+qldKtwDzcsGigtDdG0FI2QVqJYxXCI/yczaEzRXPdfCpqBBmNJ9DAl4kHPyIQq613Iu86AAM6IhwORzX73KBPgpZMO1uObY/Msu9m7sXre5yOzOzZYdGP08oLBmN4pqM=';

  let signedQuery = Alipay.sign(params, privateKey);
  expect(QueryString.parse(signedQuery).sign).toBe(sign);

});