[![npm version](https://badge.fury.io/js/storybook-addon-styled-component-theme.svg)](https://badge.fury.io/js/storybook-addon-styled-component-theme)
[![build status](https://travis-ci.org/echoulen/storybook-addon-styled-component-theme.svg?branch=master)](https://travis-ci.org/echoulen/storybook-addon-styled-component-theme)
[![codecov](https://codecov.io/gh/echoulen/storybook-addon-styled-component-theme/branch/master/graph/badge.svg)](https://codecov.io/gh/echoulen/storybook-addon-styled-component-theme)

![](https://media.giphy.com/media/FfFvOA9C0h9bhfCuNX/giphy.gif)

This addon allows storybook to showcase components with multiple different styled-component themes.
Supports storybook v4, v5, v6 and newer

## Installation

```bash
yarn add storybook-addon-styled-component-theme --dev
```

# Configuration

## storybook v6

#### Add a decorator to stories in .storybook/preview.js

```javascript

import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";

const themes = [theme1, theme2];
addDecorator(withThemesProvider(themes), ThemeProvider);
```

#### Add to .storybook/main.js

```
module.exports = {
  ...
  addons: [
    ...
    "storybook-addon-styled-component-theme/dist/preset"
  ]
};
```

## storybook v5 and v4

#### Add to .storybook/addons.js

```javascript
// v1.3, storybook v5.2
import "storybook-addon-styled-component-theme/dist/register";

// v1.2, storybook v4, v5.0
import "storybook-addon-styled-component-theme/dist/src/register";
```

#### addDecorator to .storybook/preview.js

```javascript
import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

const themes = [theme1, theme2];
addDecorator(withThemesProvider(themes));
```

#### Remind

Make sure every theme object has a `name` property

## Contributing

##### Build local library

```shell
yarn

yarn build
```

##### Start the local example

```shell
cd example

yarn

yarn storybook
```

#### Run all the spec

```shell
yarn test
```
