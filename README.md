[![npm version](https://badge.fury.io/js/storybook-addon-styled-component-theme.svg)](https://badge.fury.io/js/storybook-addon-styled-component-theme)
[![build status](https://travis-ci.org/echoulen/storybook-addon-styled-component-theme.svg?branch=master)](https://travis-ci.org/echoulen/storybook-addon-styled-component-theme)
[![codecov](https://codecov.io/gh/echoulen/storybook-addon-styled-component-theme/branch/master/graph/badge.svg)](https://codecov.io/gh/echoulen/storybook-addon-styled-component-theme)

![](https://media.giphy.com/media/FfFvOA9C0h9bhfCuNX/giphy.gif)

#### Notice
Support storybook v4, v5 and newer

#### Installation
```bash
yarn add storybook-addon-styled-component-theme --dev
```


#### Add to .storybook/addons.ts

```javascript
// v1.3, storybook v5.2
import 'storybook-addon-styled-component-theme/dist/register';

// v1.2, storybook v4, v5.0
import 'storybook-addon-styled-component-theme/dist/src/register';
```

#### addDecorator to .storybook/config.ts
```javascript
import {addDecorator} from '@storybook/react';
import {withThemesProvider} from 'storybook-addon-styled-component-theme';

const themes = [theme1, theme2];
addDecorator(withThemesProvider(themes));
```

> or

#### addDecorator to stories 

```javascript
import {withThemesProvider} from 'storybook-addon-styled-component-theme';

const themes = [theme1, theme2];

storiesOf("demo", module)
  .addDecorator(withThemesProvider(themes))
  .add("demo div", () => <div>DEMO</div>);
```

#### Remind
Make sure every theme object has a `name` property


#### Contributing

`yarn`

`yarn build`

#### Run all the spec

`yarn test`
