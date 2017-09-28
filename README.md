
# react-native-alipay

## Getting started

`$ npm install react-native-alipay --save`

### Mostly automatic installation

`$ react-native link react-native-alipay`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-alipay` and add `RNAlipay.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAlipay.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNAlipayPackage;` to the imports at the top of the file
  - Add `new RNAlipayPackage()` to the list returned by the `getPackages()` method
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
import RNAlipay from 'react-native-alipay';

// TODO: What to do with the module?
RNAlipay;
```
  