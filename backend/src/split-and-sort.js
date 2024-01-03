import { tmpFolderPath, inputFilePath, moveToTracker1, nextLine, appendToTracker2 } from './utils.js'
import {join} from 'path'
import LineByLine from 'n-readlines'
import fs from 'fs'

export default function splitAndSort() {
  console.log('splitting files')
  
  const linePerFile = 10_000
  const liner = new LineByLine(inputFilePath)

  let run = true
  let fileNumber = 0
  while (run) {
    const counter = {}
    let counterSize = 0

    while (counterSize < linePerFile) {
      const line = nextLine(liner)
      if (!line) {
        run = false
        break
      }

      const [dep, date, count] = line
      if (counter[dep]) {
        counter[dep] += +count
      } else {
        counterSize++
        counter[dep] = +count
      }
    }

    const file = counterToCSV(counter)
    if (file === '') break
    const filePath = join(tmpFolderPath, `0.${fileNumber}.tmp.csv`) //round 0

    fs.writeFileSync(filePath, file)
    appendToTracker2(filePath)
    fileNumber++
  }
  moveToTracker1()
}

function counterToCSV(counter) {
  return Object.keys(counter)
    .sort()
    .map((key) => `${key},${counter[key]}`)
    .join('\n')
}
