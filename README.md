
# react-native-alipay

Alipay SDK for React Native. Support mobile webpage url pay. Support RN >= 0.47.

Native AlipaySDK library ([download](https://docs.open.alipay.com/54/104509)):

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

// APP支付
var orderInfo = {
  // ...
};
Alipay.pay(orderInfo).then((result) => {
  console.log(result);
});

// 手机网站转APP支付
var h5PayUrl = '...';
Alipay.payInterceptorWithUrl(h5PayUrl).then((result) => {
  console.log(result);
});
```

## TODO

- [x] 手机网站转APP支付（payInterceptorWithUrl）
- [ ] APP支付功能待测试
- [ ] 完善文档
- [ ] react-native, ios, android, gradle 各个版本兼容性测试

