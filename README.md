This addon allows storybook to showcase components with multiple different jss themes.
Supports storybook v4, v5, v6 and newer

## Installation

```bash
yarn add @mmit-erp/storybook-addon-jss-component-theme --dev
```

# Configuration

## storybook v6

#### Add a decorator to stories in .storybook/preview.js

```javascript

import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-jss-component-theme";
import { ThemeProvider } from "react-jss";

const themes = [theme1, theme2];
addDecorator(withThemesProvider(themes, ThemeProvider));
```

#### Add to .storybook/main.js

```
module.exports = {
  ...
  addons: [
    ...
    "storybook-addon-jss-component-theme/dist/preset"
  ]
};
```

## storybook v5 and v4

#### Add to .storybook/addons.js

```javascript
// v1.3, storybook v5.2
import "storybook-addon-jss-component-theme/dist/register";

// v1.2, storybook v4, v5.0
import "storybook-addon-jss-component-theme/dist/src/register";
```

#### addDecorator to .storybook/preview.js

```javascript
import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-jss-component-theme";

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
