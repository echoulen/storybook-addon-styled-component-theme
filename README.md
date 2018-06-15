[![npm version](https://badge.fury.io/js/storybook-addon-styled-component-theme.svg)](https://badge.fury.io/js/storybook-addon-styled-component-theme)

#### Installation
```bash
yarn add storybook-addon-styled-component-theme --dev
```

#### 1. Add to .storybook/addons.js 

```javascript
import 'storybook-addon-styled-component-theme/dist/register';
```

#### 2. Usage
```javascript
import {ThemesProvider} from "storybook-addon-styled-component-theme";

storiesOf("demo.theme", module).add("Demo", () => (
    <ThemesProvider themes={getThemes()}>
        <Demo />
    </ThemesProvider>
));
```
