import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

function dirName() {
  return dirname(fileURLToPath(import.meta.url))
}

export const tmpFolderPath = join(dirName(), '..', 'tmp')
export const inputFilePath = join(dirName(), '..', 'data.csv')
export const outputFilePath = join(dirName(), '..', 'output.csv')
export const tracker1Path = join(tmpFolderPath, 'tracker1.txt')
export const tracker2Path = join(tmpFolderPath, 'tracker2.txt')

export function moveToTracker1() {
  fs.copyFileSync(tracker2Path, tracker1Path)
  fs.writeFileSync(tracker2Path, '')
}

export function appendToTracker2(filePath) {
  fs.writeFileSync(tracker2Path, filePath + '\n', { flag: 'a' })
}

export function nextLine(liner) {
  let buffer = liner.next()
  if (!buffer) return null
  if (buffer.toString() === '\n') return null

  const splitted = buffer.toString().trim().split(',')
  return splitted
}

export function resetTmpFolder() {
  if (fs.existsSync(tmpFolderPath)) {
    fs.rmSync(tmpFolderPath, { recursive: true })
  }
  fs.mkdirSync(tmpFolderPath)
  fs.writeFileSync(tracker1Path, '')
  fs.writeFileSync(tracker2Path, '')
}
