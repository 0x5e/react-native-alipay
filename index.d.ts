export type AlipayResultCode = '9000' | '8000' | '4000' | '5000' | '6001' | '6002';

export interface AlipayResult {
  resultStatus: AlipayResultCode;
  result: string;
  memo: string;
}

declare namespace Alipay {
  
  function authWithInfo(infoStr: string): Promise<AlipayResult>;

  // 设置沙箱模式
  function setAlipaySandbox(isSandbox: boolean): void

  function pay(infoStr: string): Promise<AlipayResult>;

  function payInterceptorWithUrl(infoStr: string): Promise<{
    resultCode: AlipayResultCode;
    returnUrl: string;
  }>;
  
  function sign(infoStr: string): string;
}

export = Alipay;
