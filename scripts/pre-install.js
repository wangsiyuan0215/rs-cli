const nodeVersion = process.versions.node;
const execPath = process.env.npm_execpath;

if (nodeVersion.localeCompare("16.15.1") < 0) {
  console.log(
    `Please upgrade the NodeJS version to at least 16.15 or above, current version is ${nodeVersion}`
  );
  process.exit(1);
}
