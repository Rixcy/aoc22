import fs from 'fs'

fs.readFile('./day1.data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const lines = data.split('\n')

  const elfCalories = lines.reduce<number[][]>(
    (acc, line) => {
      if (line === '') {
        acc.push([])
      } else {
        acc.at(-1)?.push(Number(line))
      }
      return acc
    },
    [[]]
  )

  const elfCalorieTotals = elfCalories.map((calorie) =>
    calorie.reduce((a, b) => a + b, 0)
  )

  const highestElfCalorieTotal = Math.max(...elfCalorieTotals)

  console.log('-- Day 1 --')
  console.log('-- Part 1 --')
  console.log('Highest elf calorie total: ', highestElfCalorieTotal)

  const sortedElfCalorieTotals = elfCalorieTotals
    .sort((a, b) => a - b)
    .reverse()

  const topThreeElfCalorieTotals = sortedElfCalorieTotals.slice(0, 3)
  const topThreeElfCalorieTotal = topThreeElfCalorieTotals.reduce(
    (a, b) => a + b,
    0
  )
  console.log('-- Part 2 --')
  console.log('Top three elf calorie total: ', topThreeElfCalorieTotal)
})
