<img src="./src/app/assets/images/gitgit-logo.png" width="180">
<br/>
<i>A react-native-macos and react-native-windows Git GUI</i>
<br/><br/>

# Features

- GUI for basic git actions and git history
- Visual presentation of code changes
- commands: <code>checkout</code>, <code>branch</code>, <code>stage</code>, <code>unstage</code>, <code>commit</code>, <code>push</code>, <code>pull</code>, <code>stash</code>, <code>pop</code>

### To do

- active watch (and/or git status refresh on window focus)
- commands: <code>fetch</code>, ... (many more)
- Visual tree-presentation of git history
- Context menu for file features (like discard, show in finder...)
- Code compare tool + hunk staging
- Rebare and merge (& resolve conflicts)
- Windows implementation of ShellTools

<br/>

# Getting started Mac

### Requirements

- yarn (or npm)
- node
- xcode
- cocoapods

### Steps

- `nvm use 16.13.0`
- `yarn`
- `npx pod-install`
- change `repositoryPath` in `src/domains/git/api.ts` to your repo, and save.
- `yarn macos`

# Getting started Windows <sup>(coming soon - Shelltools not implemented)</sup>

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
- change `repositoryPath` in `src/domains/git/api.ts` to your repo, and save.
- `yarn windows`
