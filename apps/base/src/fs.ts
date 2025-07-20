import fs from "node:fs";
import fsp from "node:fs/promises";

// import { promisify } from "node:util"
// const readFilePromise = promisify(fs.readFile)

function fsStatSync(archivePath: string): void {
  const stats = fs.statSync(archivePath);

  console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size,
  );
}

async function fsStatAsync(archivePath: string): Promise<void> {
  await fsp.stat(archivePath).then((stat) => {
    console.log(
      stat.isFile(),
      stat.isDirectory(),
      stat.isSymbolicLink(),
      stat.size,
    );
  });
}

function fsReadFileSync(
  firstArchivePath: string,
  secondArchivePath?: string,
): void {
  const text = fs.readFileSync(firstArchivePath, "utf-8");
  console.log(`sync: ${text}`);

  if (secondArchivePath) {
    const text = fs.readFileSync(secondArchivePath, "utf-8");
    console.log(`sync: ${text}`);
  }
}

function fsReadFileCallback(
  firstArchivePath: string,
  secondArchivePath?: string,
): void {
  fs.readFile(firstArchivePath, "utf-8", (e, text) => {
    console.log(`callback: ${text}`);
  });

  if (secondArchivePath) {
    fs.readFile(secondArchivePath, "utf-8", (e, text) => {
      console.log(`callback: ${text}`);
    });
  }
}

async function fsReadFilePromise(
  firstArchivePath: string,
  secondArchivePath?: string,
): Promise<void> {
  await fsp.readFile(firstArchivePath, "utf-8").then((text) => {
    console.log(`promise: ${text}`);
  });
  if (secondArchivePath) {
    await fsp.readFile(secondArchivePath, "utf-8").then((text) => {
      console.log(`promise: ${text}`);
    });
  }
}

async function fsReadFileAwait(
  firstArchivePath: string,
  secondArchivePath?: string,
): Promise<void> {
  const text = await fsp.readFile(firstArchivePath, "utf-8");
  console.log(`await: ${text}`);

  if (secondArchivePath) {
    const text = await fsp.readFile(secondArchivePath, "utf-8");
    console.log(`await: ${text}`);
  }
}

async function fsReadFileParallel(
  firstArchivePath: string,
  secondArchivePath: string,
): Promise<void> {
  await Promise.all([
    fsp.readFile(firstArchivePath, "utf-8"),
    fsp.readFile(secondArchivePath, "utf-8"),
  ]).then(([firstText, secondText]) => {
    console.log(`parallel: ${firstText}`);
    console.log(`parallel: ${secondText}`);
  });
}

export {
  fsStatSync,
  fsStatAsync,
  fsReadFileSync,
  fsReadFileCallback,
  fsReadFilePromise,
  fsReadFileAwait,
  fsReadFileParallel,
};
