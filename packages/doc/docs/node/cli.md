# @g2d/cli

```bash
# Run remotely:
$ npx @g2d/cli
$ yarn dlx @g2d/cli
$ pnpm dlx @g2d/cli

# Or install globally:
$ npm i -g @g2d/cli
$ pnpm i -g @g2d/cli

# Transform`.gitignore` into `.dockerignore`:
$ @g2d/cli -o .
$ @g2d/cli > .dockerignore
$ cat .gitignore > @g2d/cli

# Transform`.gitignore` to stdout:
$ @g2d/cli
$ cat .gitignore > @g2d/cli

# From specific file:
$ @g2d/cli > /my/.gitignore
$ cat /my/.gitignore > @g2d/cli

# Help
$ @g2d/cli -h

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
