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

## Install

```bash
npm install react-dancing
```

## Big advantages

- Animation without re-render component
- Less than 1KB
- Without dependency

## Use

A simple demo of `react-dancing` [DEMO](https://codesandbox.io/s/react-dancing-first-sample-1rnky)

```jsx
import React from "react";
import { Dancer, useDancer } from "react-dancing";

function App() {
  const [ref, play] = useDancer({
    duration: "1s",
  });

  const handleGo = () => {
    play({ transform: "translateX(100px)" });
  };

  const handleBack = () => {
    play({ transform: "translateX(0px)" });
  };

  return (
    <div className="App">
      <Dancer ref={ref}>React Dancing</Dancer>
      <button onClick={handleGo}>Go</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}
```

## Add default style

If you want to add style in initial time and without
animation, you can use `defaultStyle` in `useDancer` config

```jsx
const [ref, play] = useDancer({
  ...
  defaultStyle: { color: "#ff0000" },
  ...
});
```
