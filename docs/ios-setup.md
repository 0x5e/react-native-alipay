# iOS Setup

1. In XCode, in the project navigator, right click `Libraries` -> `Add Files to [your project's name]`, go to `node_modules/@0x5e/react-native-alipay` and add `RCTAlipay.xcodeproj`

2. Select your project. Add the following libraries to your project's `Build Phases` -> `Link Binary With Libraries`:
    - `libc++.tbd`
    - `libz.tbd`
    - `CFNetwork.framework`
    - `CoreGraphics.framework`
    - `CoreMotion.framework`
    - `CoreTelephony.framework`
    - `CoreText.framework`
    - `Foundation.framework`
    - `QuartzCore.framework`
    - `SystemConfiguration.framework`
    - `UIKit.framework`
    - **`libRCTAlipay.a`**

3. Add `alipay` into `LSApplicationQueriesSchemes` in `Targets` -> `info` -> `Custom iOS Target Properties`, or edit `Info.plist` like this:
```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>alipay</string> <!-- Add this line -->
</array>
```

4. Open up `AppDelegate.m`, implement two methods in `AppDelegate` like this:
```objc
// ...

#import <React/RCTLinkingManager.h>

@implementation AppDelegate

// ...

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

@end
```

5. Create a url type in `Info` -> `URL Types`.
Set `alipay` to `Identifier`, set an unique id to `URL Schemes` (whatever you like).
