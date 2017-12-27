import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import path from 'path';

import jestStylus from '../';

Enzyme.configure({ adapter: new Adapter() });

test('react renders without style', () => {
  jestStylus(path.resolve(__dirname, 'index-test.styl'));
  const component = renderer.create(
    <div>test react no style</div>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('react renders style', () => {
  jestStylus(path.resolve(__dirname, 'index-test.styl'));
  const component = renderer.create(
    <div className='test test2'>test react with style</div>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('enzyme mounts without style', () => {
  jestStylus(path.resolve(__dirname, 'index-test.styl'));
  const component = mount(
    <div>test no style</div>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
});

test('enzyme fails with invalid style', () => {
  jestStylus(path.resolve(__dirname, 'index-invalid.styl'));
  const component = mount(
    <div className='test'>test no style</div>
  );
  try {
    expect(component.getDOMNode()).toMatchSnapshot();
    fail('should not allow invalid style');
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
});

test('enzyme mounts with style', () => {
  jestStylus(path.resolve(__dirname, 'index-test.styl'));
  const component = mount(
    <div className='test test2'><div className='test3'>children</div>test style</div>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
});

test('enzyme mounts with styles', () => {
  jestStylus([path.resolve(__dirname, 'index-test.styl'), path.resolve(__dirname, 'index-test2.styl')]);
  const component = mount(
    <div className='test test2'>test styles</div>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
});
