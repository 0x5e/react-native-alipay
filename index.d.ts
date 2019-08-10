type TStatus = '9000' | '8000' | '4000' | '5000' | '6001' | '6002';

interface IResult {
  resultStatus: TStatus;
  result: string;
  memo: string;
}

declare namespace Alipay {
  
  function authWithInfo(infoStr: string): IResult;

  // 设置沙箱模式
  function setAlipaySandbox(isSandbox: boolean): void

  function pay(infoStr: string): IResult;

  function payInterceptorWithUrl(infoStr: string): {
    resultCode: TStatus;
    returnUrl: string;
  };
  
  function sign(infoStr: string): string;
}

export = Alipay;