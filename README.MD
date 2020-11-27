For old version of `react-dancing` please go to [react-dancing version 0](https://github.com/behnammodi/react-dancing/tree/version-0)

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

- Animation base on `requestAnimationFrame`
- Animation without re-render component
- Less than 5 Byte (0.5 KB) 💪 😀 [bundlephobia](https://bundlephobia.com/result?p=react-dancing)
- Without dependency

## Usage

```jsx
import React from 'react';
import { useDancer } from 'react-dancing';

function App() {
  const [ref, start, stop] = useDancer({
    interpolate: {
      transform: (x) => `translateX(${x * 100}px)`,
    },
  });

  return (
    <div>
      <div ref={ref}>React Dancing</div>
      <button onClick={() => start(0)}>Back</button>
      <button onClick={() => start(1)}>Go</button>
      <button onClick={() => stop()}>Stop</button>
    </div>
  );
}
```

## useDancer config

| Prop           | Default | Desc                                                                                               |
| -------------- | ------- | -------------------------------------------------------------------------------------------------- |
| interpolate    | {}      | type is `object` and you must interpolate `x` to styles, ex: `` { height: x => `${x * 500}px` } `` |
| duration       | 200     | type is `number` and base on milisecond                                                            |
| delay          | 0       | type is `number` and base on milisecond                                                            |
| timingFunction | x => x  | type is `function` you can find sample in [easings.net](https://easings.net/)                      |
| defaultValue   | 0       | type is `number`, if you want to reverse aninmation set `1` and run `start(0)`                     |

You can see more sample of `react-dancing` in [here](https://codesandbox.io/s/react-dancing-version-1-8cdli)

## Maintainer

[Behnam Mohamamdi](https://github.com/behnammodi)

## Donate

BTC: `1NV1sjQnXwuyHgxQ8G5eWprhxsD5A8yN6r`
