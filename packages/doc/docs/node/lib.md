# @g2d/core

## Installation

```bash npm2yarn
npm install @g2d/core detect-newline@4
```

## Usage

Since `detect-newline@4` [move to ESM](https://github.com/sindresorhus/detect-newline/commit/5539419ede22892c50a898ff416845224bf6282e), you can only use `g2d/core` in ESM:

```ts
import g2d from "@g2d/core";

const dockerignore = g2d(gitignore);
```

Using with Node environment:

```json title="./package.json"
{
  "type": "module"
}
```
