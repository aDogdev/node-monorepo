import fs from "node:fs";
import fsp from "node:fs/promises";

function ls(): void {
  fs.readdir(".", (e: NodeJS.ErrnoException | null, files: string[]) => {
    if (e) {
      console.error(e);
      return;
    }

    files.forEach((file: string) => {
      console.log(file);
    });
    console.log("<-------------->");
  });
}

function lsp(): void {
  fsp
    .readdir(".")
    .then((files: string[]) => {
      files.forEach((file: string) => {
        console.log(file);
      });
    })
    .catch((e: Error) => {
      console.error(e);
      return;
    })
    .finally(() => {
      console.log("<-------------->");
    });
}

export { ls, lsp };
