#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(ShellTools, RCTEventEmitter)

RCT_EXTERN_METHOD(executeCommand: (NSString*)command resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getOrFetchMobileKey: (NSString*)userToken generatedSaltoId:(NSString*)generatedSaltoId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
