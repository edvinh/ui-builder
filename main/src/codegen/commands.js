const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const writeCodeToFile = code => {
  const codePath = path.resolve(__dirname, '../../tmp/temp.js')
  const prettierPath = path.resolve(__dirname, '../../node_modules/prettier/bin-prettier.js')

  fs.writeFileSync(codePath, code)

  // Run prettier on generated code
  exec(
    `node ${prettierPath} --print-width 80 --no-semi --single-quote --trailing-comma es5 --write ${codePath}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log('error :(')
      }
    }
  )
}

module.exports = {
  writeCodeToFile,
}
