# @g2d/cli

`@g2d/cli` is an executable npm bin to transform .gitignore to .dockerignore .

```bash
# Run remotely:
$ npx -y @g2d/cli
$ yarn dlx @g2d/cli
$ pnpm --package=@g2d/cli dlx g2d

# Or install globally:
$ npm i -g @g2d/cli
$ pnpm i -g @g2d/cli

# Transform`.gitignore` into `.dockerignore`:
$ g2d -o .
$ g2d > .dockerignore
$ cat .gitignore > @g2d/cli

# Transform`.gitignore` to stdout:
$ @g2d/cli
$ cat .gitignore > @g2d/cli

# From specific file:
$ g2d > /my/.gitignore
$ cat /my/.gitignore > @g2d/cli

# Help
$ g2d -h

Usage:
  $ g2d [file]

Commands:
  [file]  Transform a specific file

For more info, run any command with the `--help` flag:
  $ g2d --help

Options:
  -o, --output <file>  Output file
  -s, --silent         Silent
  -h, --help           Display this message
  -v, --version        Display version number
```

## Advanced Usage

You can integrate running remotely with shell alias and it will always fetch the latest `g2d` every time.

For example, integrating `pnpm dlx` with `fish shell`:

```bash {2}
  if status is-interactive
     alias g2d "pnpm -s --package=@g2d/cli dlx g2d"
  end
```
