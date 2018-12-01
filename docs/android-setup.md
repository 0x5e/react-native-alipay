# Android Setup

1. Open up `android/app/src/main/java/[...]/MainApplication.java`, add `new AlipayPackage()` to the list returned by the `getPackages()` method like this: 
```java
// ...

import com.reactlibrary.AlipayPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    
    // ...

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new AlipayPackage() // Add this line
      );
    }
  };

  // ...
}
```

2. Append the following lines to `android/settings.gradle`:
```gradle
include ':@0x5e_react-native-alipay'
project(':@0x5e_react-native-alipay').projectDir = new File(rootProject.projectDir, '../node_modules/@0x5e/react-native-alipay/android')
```

3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
```gradle
  compile project(':@0x5e_react-native-alipay')
```

4. Insert the following lines inside allprojects => repositories in `android/build.gradle`:
```gradle
  flatDir {
    dirs "$rootDir/../node_modules/@0x5e/react-native-alipay/android/libs"
  }
```

5. Append the following lines to `android/app/proguard-rules.pro`
```
-keep class com.alipay.** { *; }
```
