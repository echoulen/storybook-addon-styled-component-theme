import React from 'react';

import {storiesOf} from '@storybook/react';
import {Demo, getAllThemes} from './Demo';
import {ThemesProvider} from 'storybook-addon-styled-component-theme';

storiesOf('Examples', module).add('Demo', () => (
  <ThemesProvider themes={getAllThemes()}>
    <Demo />
  </ThemesProvider>
));
