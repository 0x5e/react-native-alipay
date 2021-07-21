# Android Setup

1. Insert the following lines inside allprojects => repositories in `android/build.gradle`:

```gradle
    maven {
        url("${project(':shm-open_react-native-alipay').projectDir}/libs")
    }
```

## for RN < 0.60 that doesn't support autolinking:

2. Open up `android/app/src/main/java/[...]/MainApplication.java`, add `new AlipayPackage()` to the list returned by the `getPackages()` method like this:

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

3. Append the following lines to `android/settings.gradle`:

```gradle
include ':shm-open_react-native-alipay'
project(':shm-open_react-native-alipay').projectDir = new File(rootProject.projectDir, '../node_modules/@shm-open/react-native-alipay/android')
```

4. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

```gradle
    compile project(':shm-open_react-native-alipay')
```
