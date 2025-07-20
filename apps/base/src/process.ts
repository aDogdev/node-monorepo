function processS(): void {
  console.log(process.argv);
  console.log(process.cwd());
  console.log(process.platform);
  process.exit(0);
}

function processE(): void {
  process.exit(1);
}

export { processS, processE };
