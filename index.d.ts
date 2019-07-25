declare type TStatus = '9000' | '8000' | '4000' | '5000' | '6001' | '6002';

interface IResult {
	resultStatus: TStatus;
	result: string;
	memo: string;
}

interface IObject {
	[key: string]: number | string;
}

declare function authWithInfo(infoStr: string): IResult;

declare function pay(orderStr: string): IResult;

declare function payInterceptorWithUrl(h5PayUrl: string): {
	resultCode: TStatus;
	returnUrl: string;
};

declare function sign(object: IObject, privateKey: string): string;


declare const _default: {
	authWithInfo: typeof authWithInfo;
	pay: typeof pay;
	payInterceptorWithUrl: typeof payInterceptorWithUrl;
	sign: typeof sign;
};
export default _default;