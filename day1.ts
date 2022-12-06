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

  console.log('Highest elf calorie total: ', highestElfCalorieTotal)
})
