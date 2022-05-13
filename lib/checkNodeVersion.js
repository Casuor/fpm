export default function checkNodeVersion() {
  const requiredNodeVersion = require('../package.json').engines.node
  const currentNodeVersion = process.version
  // console.log(currentNodeVersion)
}
