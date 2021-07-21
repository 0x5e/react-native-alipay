require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-alipay"
  s.version      = package['version']
  s.summary      = "Alipay SDK for React Native"
  s.description  = package['description']
  s.author       = package['author']
  s.homepage     = package['homepage']
  s.license      = "MIT"
  s.platform     = :ios, "9.0"
  s.source       = { :git => "#{s.homepage}", :tag => "v#{s.version}" }
  s.source_files  = "ios/*.{h,m}"
  s.dependency "React"
  s.resource = 'ios/AlipaySDK.bundle'
  s.vendored_frameworks = 'ios/AlipaySDK.framework'
  s.frameworks = "SystemConfiguration", "CoreTelephony", "QuartzCore", "CoreText", "CoreGraphics", "UIKit", "Foundation", "CFNetwork", "CoreMotion"
  s.library = "c++", "z"
  s.requires_arc = true
end


