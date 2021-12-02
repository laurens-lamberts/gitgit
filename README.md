<img src="./src/app/assets/images/gitgit-logo.png" width="180">
<br/>
<i>A react-native-macos and react-native-windows Git GUI</i>
<br/><br/>

# Features

- GUI for basic git actions and git history
- commands: <code>checkout</code>, <code>stage</code>, <code>unstage</code>, <code>commit</code>, <code>push</code>, <code>pull</code>, <code>stash</code>, <code>pop</code>

### To do

- commands: <code>branch</code>, <code>fetch</code>, ... (many more)
- Visual presentation of code changes
- Visual tree-presentation of git history
- Code compare tool + hunk staging
- Windows implementation of ShellTools

<br/>

# Getting started Mac

### Requirements

- yarn (or npm)
- node
- xcode
- cocoapods

### Steps

- `yarn`
- `npx pod install --project-directory=macos`
- `yarn macos`

# Getting started Windows <sup>(coming soon)</sup>

### Requirements

- windows 10 or higher
- yarn (or npm)
- node
- visual studio
- <a href="https://microsoft.github.io/react-native-windows/docs/rnw-dependencies">development dependencies</a>

### Steps

- `yarn remove react-native-macos`
- `yarn add react-native-windows`
- `yarn`
- `Uncomment the two 'UNCOMMENT FOR WINDOWS' sections in metro.config.js`
- `yarn windows`
