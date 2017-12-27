[![Build Status](https://travis-ci.org/alansouzati/jest-stylus.svg?branch=master)](https://travis-ci.org/alansouzati/jest-stylus) [![Test Coverage](https://codeclimate.com/github/alansouzati/jest-stylus/badges/coverage.svg)](https://codeclimate.com/github/alansouzati/jest-stylus/coverage)

# jest-stylus

Stylus serializer for jest snapshots.

## Install

`npm install jest-stylus`

or 

`yarn add jest-stylus`

## Usage

```javascript
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import path from 'path';

import jestStylus from 'jest-stylus';

import YourComponent from '../';

Enzyme.configure({ adapter: new Adapter() });
// must be the absolute path of your stylus file/files
jestStylus(path.resolve(__dirname, '../styles/index.styl'));
// jestStylus([path.resolve(__dirname, '../styles/colors.styl'), path.resolve(__dirname, '../styles/your-component.styl')]);

describe('YourComponent', () => {
  test('renders', () => {
    const component = mount(
      <YourComponent>test</YourComponent>
    );

    expect(component).toMatchSnapshot();
  });
});
```

When calling `jestStylus` your snapshots will have the CSS for the component you are testing, for example:

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`YourComponent renders 1`] = `
.your-component {
  background: blue;
}

<div
  class="your-component"
  data-reactroot=""
>
  test
</div>
`;

```

## Build 

To build this library, execute the following commands:

  1. Install NPM modules

    $ npm install (or yarn install)

  2. Test and run linters:

    $ npm test
