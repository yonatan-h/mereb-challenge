import fs from 'fs'
import LineByLine from 'n-readlines'

const tmpFolderPath = './tmp'
const inputFilePath = './data.txt'
const outputFilePath = './output.txt'
const tracker1Path = tmpFolderPath + '/' + 'tracker1.txt'
const tracker2Path = tmpFolderPath + '/' + 'tracker2.txt'

//utils
function nextLine(liner) {
  let buffer = liner.next()
  if (!buffer) return null
  return buffer.toString().trim().split(',')
}

function moveToTracker1() {
  fs.copyFileSync(tracker2Path, tracker1Path)
  fs.writeFileSync(tracker2Path, '')
}

function appendToTracker2(filePath) {
  fs.writeFileSync(tracker2Path, filePath + '\n', { flag: 'a' })
}

function counterToCSV(counter) {
  return Object.keys(counter)
    .sort()
    .map((key) => `${key},${counter[key]}`)
    .join('\n')
}

function resetTmpFolder() {
  if (fs.existsSync(tmpFolderPath)) {
    fs.rmSync(tmpFolderPath, { recursive: true })
  }
  fs.mkdirSync(tmpFolderPath)
  fs.writeFileSync(tracker1Path, '')
  fs.writeFileSync(tracker2Path, '')
}

//main functions
function splitAndSort() {
  const linePerFile = 2_000_000
  const liner = new LineByLine(inputFilePath)
  let line = nextLine(liner)
  let i = 0

  while (line) {
    const filePath = `${tmpFolderPath}/0.${i}.tmp.txt` //round 0
    const counter = {}

    for (let j = 0; j < linePerFile; j++) {
	console.log(line);
      if (!line) {
	console.log(`I am breaking at ${j}`);
	break;
      }

      const [dep, date, count] = line
      counter[dep] = (counter[dep] || 0) + +count
      line = nextLine(liner)
    }

    const file = counterToCSV(counter)
    fs.writeFileSync(filePath, file)
    appendToTracker2(filePath)

    if (!line) break
    i++
  }
  moveToTracker1()
}

function mergeFiles(inputPath1, inputPath2, outputPath) {
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

    mergeFiles(filePath1, filePath2, mergedPath)
    fs.rmSync(filePath1)
    fs.rmSync(filePath2)
    appendToTracker2(mergedPath)
  }
}

function mergeAllRounds() {
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
}

//main
resetTmpFolder()
splitAndSort()
//mergeAllRounds()
//resetTmpFolder()
