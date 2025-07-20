import { Stats } from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import pc from "picocolors";

async function readdir(folder: string): Promise<string[]> {
  let files: string[];
  try {
    files = await fsp.readdir(folder);
    return files;
  } catch (e: unknown) {
    console.error(pc.red(e as string));
    process.exit(1);
  }
}

async function stats(filePath: string): Promise<Stats> {
  try {
    return await fsp.stat(filePath);
  } catch (e: unknown) {
    console.error(pc.red(e as string));
    process.exit(1);
  }
}

function maxFileLength(files: string[]): number {
  return Math.max(...files.map((file) => file.length));
}

async function filesPromises(
  files: string[],
  folder: string,
): Promise<Promise<string>[]> {
  return files.map(async (file) => {
    const filePath: string = path.join(folder, file);

    const fileStats: Stats = await stats(filePath);

    const isDirectory: boolean = fileStats.isDirectory();
    const fileType: "d" | "f" = isDirectory ? "d" : "f";
    const fileSize: string = fileStats.size.toString();
    const fileModified: string = fileStats.mtime.toLocaleString();

    return `${fileType === "d" ? pc.magentaBright(fileType) : pc.magenta(fileType)} ${pc.blue(file.padEnd(maxFileLength(files)))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`;
  });
}

//console: node ./dist/index.js ./src/
async function lsInfo(folder: string): Promise<void> {
  const files: string[] = await readdir(folder);

  const fp: Promise<string>[] = await filesPromises(files, folder);
  const filesInfo: string[] = await Promise.all(fp);
  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

export { lsInfo };
