import path from "node:path";

function pathJoin(): void {
  console.log(path.sep);

  const filePath: string = path.join("home", "dev", "notes.txt");
  console.log(filePath);

  const base: string = path.basename("temp/adog/password.txt");
  console.log(base);

  const filename: string = path.basename("temp/adog/password.txt", ".txt");
  console.log(filename);

  const extension: string = path.extname("workouts.module.ts");
  console.log(extension);
}

export { pathJoin };
