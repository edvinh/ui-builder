This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) & Expo.

**Disclaimer:** WIP. There might be things not working as intended.

## Starting the app

#### Web

```bash
  yarn start-web
```

#### Native

```bash
  yarn start-native
```

**_Alternatively_**

**Android**

```bash
  yarn android
```

**iOS**

```bash
  yarn ios
```

#

## How this was set up:

```bash
npx create-react-app rnw-app
cd rnw-app
yarn add -D @babel/plugin-proposal-object-rest-spread @babel/transform-react-jsx-source
yarn add react-native@0.57 react-native-web expo@32.0.6 react-art react-test-renderer expo-cli
```

**Note:** React-native, react-native-web, and expo versions must be compatible with eachother. At the time of writing, react-native-web technically only supports up to rn@0.55, however it seems to work with rn@0.57.

### Add a .babelrc

```json
{
  "presets": ["babel-preset-expo"],
  "env": {
    "development": {
      "plugins": ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-react-jsx-source"]
    }
  }
}
```

### Add .watchmanconfig

```json
{}
```

### Modify package.json

```json
...
"main": "./node_modules/expo/AppEntry.js",
"scripts": {
    "start-web": "react-scripts start",
    "build-web": "react-scripts build",
    "test-web": "react-scripts test --env=jsdom",
    "eject-web": "react-scripts eject",
    "start-native": "expo start",
    "eject-native": "expo eject",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "test-native": "node node_modules/jest/bin/jest.js --watch",
    "test": "npm run test-web && npm run test-native"
  },
  "jest": {
    "preset": "jest-expo"
  }
  ...
```

### Add ./app.json

```json
{
  "expo": {
    "sdkVersion": "32.0.0"
  }
}
```

### Modify App.test.js

```jsx
import React from 'react'
import App from './App'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON()
  expect(rendered).toBeTruthy()
})
```

### Add entrypoint to App in root folder

#### ./App.js

```jsx
import React from 'react'
import App from './src/App'

export default class NativeApp extends React.Component {
  render() {
    return <App />
  }
}
```

### Modify index.css for consistent styling on Mobile and Native

```css
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
```
