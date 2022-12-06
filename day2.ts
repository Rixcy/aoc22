import fs from 'fs'

fs.readFile('./day2.data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const lines = data.split('\n').filter((l) => l !== '')

  const grouped = lines.map((line) => line.replace(' ', '').split(''))

  const valueMap = {
    rock: 1,
    paper: 2,
    scissors: 3,
  }

  const friendlyName = (move: string) => {
    return {
      A: 'rock',
      B: 'paper',
      C: 'scissors',
      X: 'rock',
      Y: 'paper',
      Z: 'scissors',
    }[move]
  }

  const results = grouped.map(([theirMove, myMove]) => {
    const friendlyMyMove = friendlyName(myMove)

    const moveScore = (() => {
      switch (friendlyMyMove) {
        case 'rock':
          return 1
        case 'paper':
          return 2
        case 'scissors':
          return 3
        default:
          throw new Error('Please provide a valid move!')
      }
    })()

    const outcomeScore = (() => {
      switch (friendlyName(theirMove)) {
        case 'rock':
          if (friendlyMyMove === 'rock') return 3
          if (friendlyMyMove === 'paper') return 6
          if (friendlyMyMove === 'scissors') return 0
        case 'paper':
          if (friendlyMyMove === 'rock') return 0
          if (friendlyMyMove === 'paper') return 3
          if (friendlyMyMove === 'scissors') return 6
        case 'scissors':
          if (friendlyMyMove === 'rock') return 6
          if (friendlyMyMove === 'paper') return 0
          if (friendlyMyMove === 'scissors') return 3
        default:
          throw new Error('Please provide a valid move!')
      }
    })()

    const totalScore = moveScore + outcomeScore

    return totalScore
  })

  const overallScore = results.reduce((a, b) => a + b, 0)

  console.log('-- Day 1 --')
  console.log('-- Part 1 --')
  console.log('Total overall score', overallScore)
})
