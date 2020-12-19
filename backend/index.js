const { createServer } = require('http')

const { knightsPurposes } = require('./knights')

const {
  getSafePool,
  getAttackers,
  randomFromArray,
  shuffle,
  intersection,
} = require('./tools')

const port = 3317

const allowedCells = [6, 7, 8, 11, 13, 16, 17, 18]

let isVictory = true

const combine = (first, pool) => {
  pool = shuffle(pool.filter(({ cell }) => cell != first.cell))

  const second = pool.pop()
  const duoCells = [...new Set([...first.purposes, ...second.purposes])]

  let cells = []

  const third = pool.find(({ purposes }) => {
    cells = [...new Set([...duoCells, ...purposes])]

    return intersection(cells, allowedCells).length == 4
  })

  return {
    knights: [first, second, third].map(k => k.cell),
    cells,
  }
}

const onRequest = (req, res) => {
  const cell = parseInt(req.url.slice(5))

  if (!allowedCells.includes(cell)) {
    res.end()

    return
  }

  isVictory = !isVictory

  const pool = isVictory ? getSafePool(cell) : [...knightsPurposes]

  const first = isVictory
    ? randomFromArray(pool)
    : randomFromArray(getAttackers(cell))

  const { knights, cells } = combine(first, pool)

  res.end(JSON.stringify({ knights, cells, isVictory }))
}

createServer(onRequest).listen(port)

console.log(`Listen ${port} port...`)
