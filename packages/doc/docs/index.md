---
sidebar_position: 1
---

# Introduce

Transform `.gitignore` to `.dockerignore`.

[![NPM Publish](https://github.com/VdustR/g2d.js/actions/workflows/build.yml/badge.svg)](https://github.com/VdustR/g2d.js/actions/workflows/build.yml) [![GitHub Pages](https://github.com/VdustR/g2d.js/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/VdustR/g2d.js/actions/workflows/gh-pages.yml)

![g2d banner](/img/g2d-og.png)

| `.gitignore` | `.dockerignore` |
| ------------ | --------------- |
| `!/`         | `!`             |
| `!`          | `!**/`          |
| `/`          | -               |
| -            | `**/`           |

## Node

- [@g2d/core](./node/lib)
- [@g2d/cli](./node/cli)

## Deno

- [deno](./deno)

## g2d Online

We also provide a online tool to help you transform the `.gitignore` to `.dockerignore` easily.

[🚀 Go to the online tool](./online)
