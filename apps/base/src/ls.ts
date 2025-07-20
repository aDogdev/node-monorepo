import fs from "node:fs";
import fsp from "node:fs/promises";

function ls(): void {
  fs.readdir(".", (e, files) => {
    if (e) {
      console.error(e);
      return;
    }

    files.forEach((file) => {
      console.log(file);
    });
    console.log("<-------------->");
  });
}

function lsp(): void {
  fsp
    .readdir(".")
    .then((files) => {
      files.forEach((file) => {
        console.log(file);
      });
    })
    .catch((e) => {
      console.error(e);
      return;
    })
    .finally(() => {
      console.log("<-------------->");
    });
}

export { ls, lsp };
