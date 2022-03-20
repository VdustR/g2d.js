# g2d

```ts
import g2d from "https://deno.land/x/g2d/mod.ts";

const gitignore = Deno.readTextFileSync(".gitignore");
const dockerignore = g2d(gitignore);
Deno.writeTextFileSync(".dockerignore", dockerignore);
```
