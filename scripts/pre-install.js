const nodeVersion = process.versions.node
const execPath = process.env.npm_execpath

if (nodeVersion.localeCompare('16.15.1') < 0) {
  console.log(`Please upgrade node To v16.15.1, current version is ${nodeVersion}`)
  process.exit(1)
}
