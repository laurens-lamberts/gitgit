#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)notification
{
  self.moduleName = @"gitgit";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
   
//  self.window.backgroundColor = NSColor.windowBackgroundColor;
//  [self.window setMinSize:NSMakeSize(300, 200)];
  //self.window.contentView.autoresizingMask = [.minXMargin, .maxXMargin, .minYMargin, .maxYMargin, .widthSizable, .heightSizable];
  
  
  //let rootView = RCTRootView(bridge: bridge, moduleName: "gitgit", initialProperties: nil)
  //let view = self.view
  //view.addSubview(rootView)
  //rootView.frame = view.bounds
  //rootView.autoresizingMask = [.minXMargin, .maxXMargin, .minYMargin, .maxYMargin, .widthSizable, .heightSizable]

  return [super applicationDidFinishLaunching:notification];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
#ifdef RN_FABRIC_ENABLED
  return true;
#else
  return false;
#endif
}

@end
