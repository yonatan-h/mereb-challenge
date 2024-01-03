import fs from 'fs'
import { inputFilePath } from './utils.js'
import path from 'path'

function generateCSV(iterations) {
  console.log('generating csv input file')
  const bufferSize = 1_000_000

  let buffer = []

  const departments = [
    'New York',
    'Boston',
    'Chicago',
    'San Francisco',
    'Los Angeles',
    'Seattle',
    'Dallas',
    'Atlanta',
    'Denver',
    'Houston',
    'Miami',
    'Phoenix',
    'Minneapolis',
    'Detroit',
    'San Diego',
    'Tampa',
    'St. Louis',
    'Baltimore',
    'Orlando',
    'Portland',
  ]

  fs.writeFileSync(inputFilePath, '')

  for (let i = 0; i < iterations; i++) {
    const randomIndex = Math.floor(Math.random() * departments.length)
    const department = departments[randomIndex]
    buffer.push(`${department},2020-01-01,1\n`)

    if (i > 0 && i % bufferSize === 0) {
      const file = buffer.join('')
      fs.writeFileSync(inputFilePath, file, { flag: 'a' })
      console.log(`appended chunk input ...`)
      buffer = []
    }
  }
  const file = buffer.join('')
  fs.writeFileSync(inputFilePath, file, { flag: 'a' })
  console.log('finished generating csv input file')
}

//20 bytes per line
const fiveGBLines = 250_000_000 // =~ 5GB file
const oneGBLines = 50_000_000 // =~ 1GB file
const oneMBLines = 50_000 // =~ 1mb file
const twoThousandLines = 2000 // =~ 40kb file
const twentyLines = 20

//generateCSV(fiveGBLines)
//generateCSV(oneGBLines)
generateCSV(oneMBLines)
// generateCSV(twoThousandLines)
//generateCSV(twentyLines)
