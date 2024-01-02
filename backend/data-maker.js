import fs from 'fs'

function generateCSV(iterations) {
  const filePath = './data.txt'
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

  fs.writeFileSync(filePath, '')
  for (let i = 0; i < iterations; i++) {
    const randomIndex = Math.floor(Math.random() * departments.length)
    const department = departments[randomIndex]
    buffer.push(`${department},2020-01-01,1\n`)

    if (i > 0 && i % bufferSize === 0) {
      const file = buffer.join('')
      fs.writeFileSync(filePath, file, { flag: 'a' })
      buffer = []
    }
  }
  const file = buffer.join('')
  fs.writeFileSync(filePath, file, { flag: 'a' })
}

//20 bytes per line
const tenGBLines = 500_000_000 // =~ 10GB file
const oneGBLines = 50_000_000 // =~ 1GB file
const oneMBLines = 50_000 // =~ 1mb file
const twoThousandLines = 2000 // =~ 40kb file
const tenLines = 10
//generateCSV(tenGBLines)
// generateCSV(oneGBLines)
// generateCSV(oneMBLines)
 generateCSV(twoThousandLines)
// generateCSV(tenLines)
