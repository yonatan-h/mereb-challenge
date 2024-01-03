import {
  tmpFolderPath,
  tracker1Path,
  nextLine,
  appendToTracker2,
  moveToTracker1,
  outputFilePath
} from './utils.js'
import LineByLine from 'n-readlines'
import fs from 'fs'

export default function merge() {
  console.log('merging tmp csv files')
  for (let i = 1; i < Infinity; i++) {
    const liner = new LineByLine(tracker1Path)
    const mulitpleTempFiles = liner.next() && liner.next()
    if (!mulitpleTempFiles) break

    mergeRound(i)
    console.log(`round ${i} merging done`)
    moveToTracker1()
  }

  const lastTmpPath = nextLine(new LineByLine(tracker1Path)).join('')
  fs.copyFileSync(lastTmpPath, outputFilePath)
  console.log('finished')
}
function mergeRound(round) {
  const liner = new LineByLine(tracker1Path)

  for (let i = 0; i < Infinity; i++) {
    const filePath1 = nextLine(liner)?.join('')
    const filePath2 = nextLine(liner)?.join('')
    const mergedPath = `${tmpFolderPath}/${round}.${i}.tmp.txt`

    if (!filePath1) break

    if (!filePath2) {
      fs.copyFileSync(filePath1, mergedPath)
      fs.rmSync(filePath1)
      appendToTracker2(mergedPath)
      break
    }

    mergeTwoFiles(filePath1, filePath2, mergedPath)
    fs.rmSync(filePath1)
    fs.rmSync(filePath2)
    appendToTracker2(mergedPath)
  }
  
  
}

function mergeTwoFiles(inputPath1, inputPath2, outputPath) {
  const liner1 = new LineByLine(inputPath1)
  const liner2 = new LineByLine(inputPath2)

  let line1 = nextLine(liner1)
  let line2 = nextLine(liner2)

  while (line1 && line2) {
    const [dep1, count1] = line1
    const [dep2, count2] = line2

    if (dep1 < dep2) {
      fs.writeFileSync(outputPath, `${dep1},${count1}\n`, { flag: 'a' })
      line1 = nextLine(liner1)
    } else if (dep2 < dep1) {
      fs.writeFileSync(outputPath, `${dep2},${count2}\n`, { flag: 'a' })
      line2 = nextLine(liner2)
    } else {
      line1[1] = +count1 + +count2
      line2 = nextLine(liner2)
    }
  }

  while (line1) {
    fs.writeFileSync(outputPath, `${line1[0]},${line1[1]}\n`, { flag: 'a' })
    line1 = nextLine(liner1)
  }

  while (line2) {
    fs.writeFileSync(outputPath, `${line2[0]},${line2[1]}\n`, { flag: 'a' })
    line2 = nextLine(liner2)
  }
}
