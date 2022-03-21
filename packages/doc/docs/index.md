---
sidebar_position: 1
---

# Introduce

Transform `.gitignore` to `.dockerignore`.

| `.gitignore` | `.dockerignore` |
| ------------ | --------------- |
| `!/`         | `!`             |
| `!`          | `!**/`          |
| `/`          | -               |
| -            | `**/`           |

## Node

- [lib](./node/lib)
- [cli](./node/cli)

## Deno

- [deno](./deno)

## g2d Online

We also provide a online tool to help you transform the `.gitignore` to `.dockerignore` easily.

[🚀 Go to the online tool](./online)
