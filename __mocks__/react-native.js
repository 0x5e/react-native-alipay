const ReactNative = jest.genMockFunction()

ReactNative.NativeModules = {
  Alipay: {}
}

module.exports = ReactNative;