
# react-native-alipay

[![Build Status](https://travis-ci.org/0x5e/react-native-alipay.svg?branch=master)](https://travis-ci.org/0x5e/react-native-alipay)

Alipay SDK for React Native. Support mobile webpage url payment. Support RN >= 0.47.

Native AlipaySDK library ([download page](https://docs.open.alipay.com/54/104509)):

- iOS: v15.4.1 (2017.7.26)
- Android: v15.4.5 (2017.9.22)

## Requirement

- React Native >= 0.20
- iOS >= 7.0
- Android >= 4.1 (API 16)

## Getting started

`$ yarn add @0x5e/react-native-alipay`

### Native module installation

- [iOS Setup](./docs/ios-setup.md)
- [Android Setup](./docs/android-setup.md)

## API Documentation

### Alipay.authWithInfo(infoStr)

- `infoStr`: Auth request info in query string format. Must be signed before use. See [Auth request params description](https://docs.open.alipay.com/218/105327).

Returns object with following fields:

|field|type|description|
|:----|:---|:----------|
|`resultStatus`|String|See [Response code description](#response-code-description)|
|`result`|String|Result data in query string format|
|`memo`|String|Reserved field, nothing|

The `result` data has following fields:

|field|type|description|
|:----|:---|:----------|
|`success`|Boolean|`true` if succeed|
|`result_code`|String|Result code|
|`auth_code`|String|Authorization code|
|`user_id`|String|User id|

The `result_code` description:

|code|description|
|:----|:----------|
|200|业务处理成功，会返回authCode|
|202|系统异常，请稍后再试或联系支付宝技术支持|
|1005|账户已冻结，如有疑问，请联系支付宝技术支持|

Example code:

```javascript
import QueryString from 'query-string';
import Alipay from '@0x5e/react-native-alipay';

// 快捷登录授权
try {
  let info = {
    apiname: 'com.alipay.account.auth',
    method: 'alipay.open.auth.sdk.code.get',
    app_id: 'xxxx',
    app_name: 'mc',
    biz_type: 'openservice',
    pid: 'xxxx',
    product_id: 'APP_FAST_LOGIN',
    scope: 'kuaijie',
    target_id: 'xxxx',
    auth_type: 'AUTHACCOUNT', // [AUTHACCOUNT, LOGIN]
    sign_type: 'RSA2',
    sign: 'xxxx',
  };
  let infoStr = QueryString.stringify(info); // key1=value1&key2=value2&...
  let response = await Alipay.authWithInfo(infoStr);
  console.info(response);
  
  let { resultStatus, result, memo } = response;
  let { success, result_code, auth_code, user_id } = QueryString.parse(result);
  
  // TODO: ...
  
} catch (error) {
  console.error(error);
}
```

### Alipay.pay(orderStr)

- `orderStr` Order info in query string format. Must be signed before use. See [App payment request params description](https://docs.open.alipay.com/204/105465/).

Returns object with following fields:

|field|type|description|
|:----|:---|:----------|
|`resultStatus`|String|See [Response code description](#response-code-description)|
|`result`|String|Result data in json string format|
|`memo`|String|Reserved field, nothing|

The `result` data has following fields:

|field|type|description|
|:----|:---|:----------|
|`code`|String|结果码，具体见[公共错误码](https://docs.open.alipay.com/common/105806)|
|`msg`|String|处理结果的描述，信息来自于code返回结果的描述|
|`app_id`|String|支付宝分配给开发者的应用Id|
|`out_trade_no`|String|商户网站唯一订单号|
|`trade_no`|String|该交易在支付宝系统中的交易流水号|
|`total_amount`|String|该笔订单的资金总额，单位为RMB-Yuan|
|`seller_id`|String|收款支付宝账号对应的支付宝唯一用户号|
|`charset`|String|编码格式|
|`timestamp`|String|时间|

Example code:

```javascript
import QueryString from 'query-string';
import Alipay from '@0x5e/react-native-alipay';

// APP支付
try {
  let order = {
      app_id: 'xxxx',
      method: 'alipay.trade.app.pay',
      charset: 'utf-8',
      timestamp: '2014-07-24 03:07:50',
      version: '1.0',
      notify_url: 'https://api.xxx.com/notify',
      biz_content: {
        subject: '大乐透',
        out_trade_no: 'xxxx',
        total_amount: '9.00',
        product_code: 'QUICK_MSECURITY_PAY',
      },
      sign_type: 'RSA2',
      sign: 'xxxx',
  };
  let orderStr = QueryString.stringify(order); // key1=value1&key2=value2&...
  let response = await Alipay.pay(orderStr);
  console.info(response);
  
  let { resultStatus, result, memo } = response;
  let { code, msg, app_id, out_trade_no, trade_no, total_amount, seller_id, charset, timestamp } = JSON.parse(result);
  
  // TODO: ...
  
} catch (error) {
  console.error(error);
}
```

### Alipay.payInterceptorWithUrl(h5PayUrl)

- `h5PayUrl` The url string of mobile webpage payment. You may get it from webview.

Returns object with following fields:

|field|type|description|
|:----|:---|:----------|
|`resultCode`|String|[返回码](#response-code-description)|
|`returnUrl`|String|支付结束后应当跳转的url地址|

Example code:

```javascript
import QueryString from 'query-string';
import Alipay from '@0x5e/react-native-alipay';

// 手机网站转APP支付
try {
  let params = {
    _input_charset: 'utf-8',
    format: 'xml',
    partner: 'xxxx',
    req_data: '<auth_and_execute_req><request_token>xxxx</request_token></auth_and_execute_req>',
    sec_id: 'MD5',
    service: 'alipay.wap.auth.authAndExecute',
    v: '2.0',
    sign: 'xxxx',
  };
  let h5PayUrl = 'https://wappaygw.alipay.com/service/rest.htm?' + QueryString.stringify(params);
  let { resultCode, returnUrl } = await Alipay.payInterceptorWithUrl(h5PayUrl);
  console.info(resultCode, returnUrl);
} catch (error) {
  console.error(error);
}
```

### Response code description

|code|description|
|:-----------|:----------|
|9000|操作成功|
|8000|正在处理中|
|4000|操作失败|
|5000|重复请求|
|6001|用户中途取消|
|6002|网络连接出错|

## TODO

- [ ] 快捷登录授权（https://docs.open.alipay.com/218/105327/）
- [ ] APP支付（https://docs.open.alipay.com/204/105465/
）
- [x] 手机网站转APP支付（https://docs.open.alipay.com/204/105695/）
- [ ] react-native, ios, android, gradle 各个版本兼容性测试
- [x] 更详细的iOS接入步骤(https://docs.open.alipay.com/203/106493/)
- [x] 完善文档
- [ ] Demo工程
- [ ] 集成接口签名

## License

MIT
