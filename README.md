
# react-native-alipay

Alipay SDK for React Native. Support mobile webpage url payment. Support RN >= 0.47.

Native AlipaySDK library ([download page](https://docs.open.alipay.com/54/104509)):

- iOS: v15.4.1 (2017.7.26)
- Android: v15.4.5 (2017.9.22)

## Getting started

`$ yarn add 0x5e/react-native-alipay`

### Mostly automatic installation

`$ react-native link react-native-alipay`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-alipay` and add `RCTAlipay.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRCTAlipay.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.AlipayPackage;` to the imports at the top of the file
  - Add `new AlipayPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-alipay'
  	project(':react-native-alipay').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-alipay/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-alipay')
  	```

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
- [ ] 更详细的iOS接入步骤(https://docs.open.alipay.com/203/106493/)
- [ ] 完善文档
- [ ] Demo工程
- [ ] 集成接口签名