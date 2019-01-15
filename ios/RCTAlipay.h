//
//  RCTAlipay.h
//  RCTAlipay
//
//  Created by 高森 on 2017/9/30.
//  Copyright © 2017年 0x5e. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <UIKit/UIKit.h>

#if __has_include("AlipaySDK.h")
#import "AlipaySDK.h"
#else
#import <AlipaySDK/AlipaySDK.h>
#endif

@interface RCTAlipay : NSObject <RCTBridgeModule>

@end
