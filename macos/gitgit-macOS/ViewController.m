#import "ViewController.h"
#import "AppDelegate.h"

#import <React/RCTRootView.h>

#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

@implementation ViewController

- (void)viewDidLoad {
  [super viewDidLoad];

  RCTBridge *bridge = [((AppDelegate *)[NSApp delegate])bridge];
#if RCT_DEV
[bridge moduleForClass:[RCTDevLoadingView class]];
#endif
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"gitgit" initialProperties:nil];

  NSView *view = [self view];

  [view addSubview:rootView];
  [rootView setBackgroundColor:[NSColor windowBackgroundColor]];
  [rootView setFrame:[view bounds]];
  [rootView setAutoresizingMask:(NSViewMinXMargin | NSViewMinXMargin | NSViewMinYMargin | NSViewMaxYMargin | NSViewWidthSizable | NSViewHeightSizable)];
}

@end
