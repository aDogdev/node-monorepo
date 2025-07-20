import os from "node:os";

function osInfo(): void {
  console.log("OS info:");
  console.log("<------------------------------------->");
  console.log(`OS platform: ${os.platform()}`);
  console.log(`OS version: ${os.release()}`);
  console.log(`CPU architecture: ${os.arch()}`);
  console.log(`CPUs: ${os.cpus().length}`);
  console.log(`Free system memory: ${os.freemem() / 1024 / 1024}`);
  console.log(`Total amount of system memory: ${os.totalmem() / 1024 / 1024}`);
  console.log(`System uptime: ${os.uptime() / 60 / 60}`);
}

export { osInfo };
