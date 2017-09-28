
package com.reactlibrary;

import com.alipay.sdk.app.H5PayCallback;
import com.alipay.sdk.util.H5PayResultModel;
import com.alipay.sdk.app.PayTask;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class AlipayModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public AlipayModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RCTAlipay";
  }

  @ReactMethod
  public void pay(final String orderInfo, final Promise promise) {
    Runnable runnable = new Runnable() {
      @Override
      public void run() {
        promise.resolve(getPayTask().payV2(orderInfo, true));
      }
    };
    Thread thread = new Thread(runnable);
    thread.start();
  }

  @ReactMethod
  public void payInterceptorWithUrl(final String h5PayUrl, final Promise promise) {
    getPayTask().payInterceptorWithUrl(h5PayUrl, true, new H5PayCallback() {
      @Override
      public void onPayResult(H5PayResultModel h5PayResultModel) {
        promise.resolve(H5PayResultModelToMap(h5PayResultModel));
      }
    });
  }

  @ReactMethod
  public void getVersion(Promise promise) {
    promise.resolve(getPayTask().getVersion());
  }

  private PayTask getPayTask() {
    return new PayTask(getCurrentActivity());
  }

  private WritableMap H5PayResultModelToMap(H5PayResultModel h5PayResultModel) {
    WritableMap map = Arguments.createMap();
    map.putString("resultCode", h5PayResultModel.getResultCode());
    map.putString("returnUrl", h5PayResultModel.getReturnUrl());
    return map;
  }
}