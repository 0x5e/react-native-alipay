
# react-native-alipay

Alipay SDK for React Native. Support mobile webpage url payment. Support RN >= 0.47.

Native AlipaySDK library ([download page](https://docs.open.alipay.com/54/104509)):

- iOS: v15.4.1 (2017.7.26)
- Android: v15.4.5 (2017.9.22)

## Requirement

- React Native >= 0.20
- iOS >= 7.0
- Android >= 4.1 (API 16)

## Getting started

`$ yarn add 0x5e/react-native-alipay`

### Native module installation

- [iOS Setup]((./docs/ios-setup.md))
- [Android Setup]((./docs/android-setup.md))

## Usage

```javascript
import Alipay from 'react-native-alipay';

// 快捷登录授权
try {
  let infoStr = '...';
  let { memo, result, resultStatus } = await Alipay.authWithInfo(infoStr);
  console.log('authWithInfo success:', memo, result, resultStatus);
} catch (error) {
  console.log('authWithInfo failure:', error);
}

// APP支付
try {
  let orderInfo = {
    // ...
  };
  let { memo, result, resultStatus } = await Alipay.pay(orderInfo);
  console.log('pay success:', memo, result, resultStatus);
} catch (error) {
  console.log('pay failure:', error);
}

// 手机网站转APP支付
try {
  let h5PayUrl = 'https://wappaygw.alipay.com/service/rest.htm?_input_charset=utf-8&format=xml&partner=xxxx&req_data=xxxx&sec_id=MD5&service=alipay.wap.auth.authAndExecute&sign=xxxx&v=2.0';
  let { resultCode, returnUrl } = await Alipay.payInterceptorWithUrl(h5PayUrl);
  console.log('payInterceptorWithUrl success:', resultCode, returnUrl);
} catch (error) {
  console.log('payInterceptorWithUrl failure:', error);
}
```

## TODO

- [ ] 快捷登录授权（https://docs.open.alipay.com/218/105327/）
- [ ] APP支付（https://docs.open.alipay.com/204/105465/
）
- [x] 手机网站转APP支付（https://docs.open.alipay.com/204/105695/）
- [ ] react-native, ios, android, gradle 各个版本兼容性测试
- [x] 更详细的iOS接入步骤(https://docs.open.alipay.com/203/106493/)
- [ ] 完善文档
- [ ] Demo工程
- [ ] 集成接口签名
