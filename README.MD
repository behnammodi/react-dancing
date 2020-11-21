[![NPM](https://nodei.co/npm/react-dancing.png)](https://nodei.co/npm/react-dancing/)

<a href="https://www.npmjs.com/package/react-dancing">
  <img src="https://img.shields.io/npm/v/react-dancing.svg" alt="Version">
</a>

<a href="https://bundlephobia.com/result?p=react-dancing">
<img src="https://badgen.net/bundlephobia/minzip/react-dancing" alt="Minzipped size">
</a>

<a href="https://www.npmjs.com/package/react-dancing">
  <img src="https://badgen.net/npm/dt/react-dancing" alt="Downloads">
</a>

<a href="https://www.npmjs.com/package/react-dancing">
  <img src="https://img.shields.io/npm/l/react-dancing.svg" alt="License">
</a>

<a href="https://snyk.io/test/npm/react-dancing">
  <img src="https://snyk.io/test/npm/react-dancing/badge.svg?style=flat-square" alt="Known Vulnerabilities">
</a>

<a href="https://www.codetriage.com/behnammodi/react-dancing">
  <img src="https://www.codetriage.com/behnammodi/react-dancing/badges/users.svg" alt="Open Source Helpers"> 
</a>

## Installation

Using npm:

```bash
npm install react-dancing
```

## Big advantages

- Animation without re-render component
- Less than 0.6KB (GZIP)
- Without dependency

## Usage

A simple demo of `react-dancing` [DEMO](https://codesandbox.io/s/react-dancing-first-sample-1rnky)

```jsx
import React from 'react';
import { Dancer, useDancer } from 'react-dancing';

function App() {
  const [ref, play] = useDancer();

  const handleGo = () => {
    play({ transform: 'translateX(100px)' });
  };

  const handleBack = () => {
    play({ transform: 'translateX(0px)' });
  };

  return (
    <div>
      <Dancer ref={ref}>React Dancing</Dancer>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleGo}>Go</button>
    </div>
  );
}
```

## Change duration

By Default `duration` is `200ms` but you can change it.

Values ex: `1.5s`, `1500ms`, `inherit`, `initial`, `unset` or `null`

```jsx
const [ref, play] = useDancer({
  ...
  duration: '3s',
  ...
});
```

## Add default style

If you want to add style in initial time and without
animation, you can use `defaultStyle` in `useDancer` config.

```jsx
const [ref, play] = useDancer({
  ...
  defaultStyle: { color: "#ff0000" },
  ...
});
```

## Change timing function

By Default `timingFunction` is `ease` but you can change it to:

|         |          |             |        |            |          |            |                   |         |         |       |
| :-----: | :------: | :---------: | :----: | :--------: | :------: | :--------: | :---------------: | :-----: | :-----: | :---: |
| ease-in | ease-out | ease-in-out | linear | step-start | step-end | steps(...) | cubic-bezier(...) | inherit | initial | unset |

[More Info MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)

```jsx
const [ref, play] = useDancer({
  ...
  timingFunction: 'ease-in-out',
  ...
});
```

Also you can use these 2 links to find best timing function

[easings.net](https://easings.net/)

[cubic-bezier.com](https://cubic-bezier.com/)

## Add delay to start animation

By Default `delay` is `0` but you can change it.

Values ex: `1.5s`, `1500ms`, `inherit`, `initial`, `unset` or `null`

```jsx
const [ref, play] = useDancer({
  ...
  delay: '3s',
  ...
});
```

## Maintainer

[Behnam Mohamamdi](https://github.com/behnammodi)

## Donate

BTC: `1NV1sjQnXwuyHgxQ8G5eWprhxsD5A8yN6r`
