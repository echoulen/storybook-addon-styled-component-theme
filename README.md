[![npm version](https://badge.fury.io/js/storybook-addon-jss-theme.svg)](https://badge.fury.io/js/storybook-addon-jss-theme)
[![build status](https://travis-ci.org/echoulen/storybook-addon-jss-theme.svg?branch=master)](https://travis-ci.org/echoulen/storybook-addon-jss-theme)
[![codecov](https://codecov.io/gh/echoulen/storybook-addon-jss-theme/branch/master/graph/badge.svg)](https://codecov.io/gh/echoulen/storybook-addon-jss-theme)


This addon allows storybook to showcase components with multiple different jss themes.
Supports storybook v4, v5, v6 and newer

## Installation

```bash
yarn add storybook-addon-jss-theme --dev
```

# Configuration

## storybook v6

#### Add a decorator to stories in .storybook/preview.js

```javascript

import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-jss-theme";
import { ThemeProvider } from "jss";

const themes = [theme1, theme2];
addDecorator(withThemesProvider(themes, ThemeProvider));
```

#### Add to .storybook/main.js

```
module.exports = {
  ...
  addons: [
    ...
    "storybook-addon-jss-theme/dist/preset"
  ]
};
```

## storybook v5 and v4

#### Add to .storybook/addons.js

```javascript
// v1.3, storybook v5.2
import "storybook-addon-jss-theme/dist/register";

// v1.2, storybook v4, v5.0
import "storybook-addon-jss-theme/dist/src/register";
```

#### addDecorator to .storybook/preview.js

```javascript
import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-jss-theme";

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
