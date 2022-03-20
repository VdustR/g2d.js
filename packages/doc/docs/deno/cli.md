# g2d

[![Test](https://github.com/VdustR/g2d/actions/workflows/test.yml/badge.svg)](https://github.com/VdustR/g2d/actions/workflows/test.yml)
[![Release](https://github.com/VdustR/g2d/actions/workflows/build.yml/badge.svg)](https://github.com/VdustR/g2d/actions/workflows/build.yml)
[![ghcr](https://github.com/VdustR/g2d/actions/workflows/ghcr.yml/badge.svg)](https://github.com/VdustR/g2d/actions/workflows/ghcr.yml)

Transform `.gitignore` into `.dockerignore`.

| `.gitignore` | `.dockerignore` |
| ------------ | --------------- |
| `!/`         | `!`             |
| `!`          | `!**/`          |
| `/`          | -               |
| -            | `**/`           |

## Binary

Check [releases](https://github.com/VdustR/g2d/releases).

## Usage

`g2d` will detect the nearest `.gitignore` by default.

```sh
# stdout
g2d

# specific file
g2d foo/.gitignore

# export to ./.dockerignore
g2d -o .

# if foo is a directory
# .dockerignore would be exported to foo/.dockerignore
g2d -o foo
cat foo/.gitignore

# if foo is a file
# .dockerignore would be exported to foo
g2d -o foo
cat foo

# from stdin to stdout
cat .gitignore | g2d > .dockerignore

# more
g2d -h
```

## Install with Deno

```sh
# install from remote
deno install \
  --unstable \
  --allow-read \
  --allow-write \
  -n g2d \
  https://deno.land/x/g2d/bin.ts

# install from local repo
git clone git@github.com:VdustR/g2d.git
deno install \
  --unstable \
  --allow-read \
  --allow-write \
  -n g2d \
  bin.ts

# uninstall
deno uninstall g2d
```

## Container

Check [g2d container](https://github.com/VdustR/g2d/pkgs/container/g2d).

```bash
docker pull ghcr.io/vdustr/g2d:latest
docker image tag ghcr.io/vdustr/g2d:latest g2d:latest
docker run --rm -it -v $(pwd):/repo g2d g2d /repo/.gitignore -o /repo
```
