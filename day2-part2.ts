import fs from 'fs'

fs.readFile('./day2.data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const lines = data.split('\n').filter((l) => l !== '')

  const grouped = lines.map((line) => line.replace(' ', '').split(''))

  const moveName = (move: string) => {
    return {
      A: 'rock',
      B: 'paper',
      C: 'scissors',
    }[move]
  }

  const moveScore = (move: string) => {
    const score = {
      rock: 1,
      paper: 2,
      scissors: 3,
    }[move]

    if (!score) throw new Error('Please provide a valid move!')

    return score
  }

  const outcomeName = (outcome: string) => {
    switch (outcome) {
      case 'X':
        return 'lose'
      case 'Y':
        return 'draw'
      case 'Z':
        return 'win'
    }
  }

  const resultsDayTwo = grouped.map(([theirMove, outcome]) => {
    const friendlyOutcome = outcomeName(outcome)

    const friendlyOutcomeScore = (() => {
      if (friendlyOutcome === 'win') return 6
      else if (friendlyOutcome === 'draw') return 3
      else if (friendlyOutcome === 'lose') return 0
      else throw new Error('Please provide a valid outcome!')
    })()

    let myMoveScore = 0

    const friendlyTheirMove = moveName(theirMove)
    if (friendlyTheirMove === 'rock') {
      if (friendlyOutcome === 'win') myMoveScore = moveScore('paper')
      if (friendlyOutcome === 'draw') myMoveScore = moveScore('rock')
      if (friendlyOutcome === 'lose') myMoveScore = moveScore('scissors')
    } else if (friendlyTheirMove === 'paper') {
      if (friendlyOutcome === 'win') myMoveScore = moveScore('scissors')
      if (friendlyOutcome === 'draw') myMoveScore = moveScore('paper')
      if (friendlyOutcome === 'lose') myMoveScore = moveScore('rock')
    } else if (friendlyTheirMove === 'scissors') {
      if (friendlyOutcome === 'win') myMoveScore = moveScore('rock')
      if (friendlyOutcome === 'draw') myMoveScore = moveScore('scissors')
      if (friendlyOutcome === 'lose') myMoveScore = moveScore('paper')
    }

    const totalScore = friendlyOutcomeScore + myMoveScore

    return totalScore
  })

  const overallScoreDayTwo = resultsDayTwo.reduce((a, b) => a + b, 0)

  console.log('-- Day 2 --')
  console.log('-- Part 2 --')
  console.log('Total overall score', overallScoreDayTwo)
})
