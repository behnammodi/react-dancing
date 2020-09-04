/* eslint-disable no-undef */
import React from 'react';
import { Dancer, useDancer } from '../src';
import { create } from 'react-test-renderer';

test('Snapshot a simple <Dancer />', () => {
  function App() {
    const [ref] = useDancer();
    return <Dancer ref={ref}></Dancer>;
  }

  const component = create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Snapshot a <Dancer /> with some props', () => {
  function App() {
    const [ref] = useDancer();
    return (
      <Dancer ref={ref} className="a" id="b" style={{ margin: 100 }}></Dancer>
    );
  }

  const component = create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
