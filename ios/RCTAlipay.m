//
//  RCTAlipay.m
//  RCTAlipay
//
//  Created by 高森 on 2017/9/30.
//  Copyright © 2017年 0x5e. All rights reserved.
//

#import "RCTAlipay.h"

// RCTLinking/RCTLinkingManager.m
static NSString *const kOpenURLNotification = @"RCTOpenURLNotification";

@interface RCTAlipay ()

@property (nonatomic, copy) RCTPromiseResolveBlock payOrderResolve;

@end

@implementation RCTAlipay

- (instancetype)init {
    if (self = [super init]) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:kOpenURLNotification object:nil];
    }
    return self;
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (void)handleOpenURL:(NSNotification *)notification {
    NSString *urlString = notification.userInfo[@"url"];
    NSURL *url = [NSURL URLWithString:urlString];
    if ([url.host isEqualToString:@"safepay"]) {
        __weak __typeof__(self) weakSelf = self;
        [AlipaySDK.defaultService processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"processOrderWithPaymentResult = %@", resultDic);
            if (weakSelf.payOrderResolve) {
                weakSelf.payOrderResolve(resultDic);
                weakSelf.payOrderResolve = nil;
            }
        }];
        
        [AlipaySDK.defaultService processAuth_V2Result:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"processAuth_V2Result = %@", resultDic);
        }];
    }
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(authWithInfo:(NSString *)infoStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [AlipaySDK.defaultService auth_V2WithInfo:infoStr fromScheme:self.appScheme callback:^(NSDictionary *resultDic) {
        resolve(resultDic);
    }];
}

RCT_EXPORT_METHOD(pay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    self.payOrderResolve = resolve;
    [AlipaySDK.defaultService payOrder:orderInfo fromScheme:self.appScheme callback:^(NSDictionary *resultDic) {
//        resolve(resultDic);
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
    resolve(AlipaySDK.defaultService.currentVersion);
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
