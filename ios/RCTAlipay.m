//
//  RCTAlipay.m
//  RCTAlipay
//
//  Created by 高森 on 2017/9/30.
//  Copyright © 2017年 0x5e. All rights reserved.
//

#import "RCTAlipay.h"

extern NSString *const RCTOpenURLNotification;

@implementation RCTAlipay

- (instancetype)init {
    if (self = [super init]) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:RCTOpenURLNotification object:nil];
    }
    return self;
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)handleOpenURL:(NSNotification *)notification {
    NSString *urlString = notification.userInfo[@"url"];
    NSURL *url = [NSURL URLWithString:urlString];
    if ([url.host isEqualToString:@"safepay"]) {
        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"result = %@", resultDic);
        }];
    }
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(pay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [AlipaySDK.defaultService payOrder:orderInfo fromScheme:self.appScheme callback:^(NSDictionary *resultDic) {
        resolve(resultDic);
    }];
}

RCT_EXPORT_METHOD(payInterceptorWithUrl:(NSString *)urlStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [AlipaySDK.defaultService payInterceptorWithUrl:urlStr fromScheme:self.appScheme callback:^(NSDictionary *resultDic) {
        resolve(resultDic);
    }];
}

RCT_EXPORT_METHOD(getVersion:(RCTPromiseResolveBlock)resolve) {
    resolve(@[AlipaySDK.defaultService.currentVersion]);
}

- (NSString *)appScheme {
    NSArray *urlTypes = NSBundle.mainBundle.infoDictionary[@"CFBundleURLTypes"];
    for (NSDictionary *urlType in urlTypes) {
        NSString *urlName = urlType[@"CFBundleURLName"];
        if ([urlName hasPrefix:@"alipay"]) {
            NSArray *schemes = urlType[@"CFBundleURLSchemes"];
            return schemes.firstObject;
        }
    }
    return nil;
}

@end
