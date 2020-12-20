const { createServer } = require('http')

const { knightsPurposes } = require('./knights')

const {
  allowedCells,
  getSafePool,
  getAttackers,
  randomFromArray,
  shuffle,
  allowedCount,
  difference,
  uniqUnion,
} = require('./tools')

const port = 3317

let isVictory = true

const takeSecond = (first, pool) => {
  const firstAllowedCount = allowedCount(first.purposes)

  let second, duoCells

  do {
    second = pool.pop()
    duoCells = uniqUnion(first.purposes, second.purposes)
  } while (allowedCount(duoCells) == firstAllowedCount)

  return { second, duoCells }
}

const combine = (first, pool) => {
  pool = shuffle(pool.filter(({ cell }) => cell != first.cell))

  const { second, duoCells } = takeSecond(first, pool)

  let trioCells = []

  const third = pool.find(({ purposes }) => {
    trioCells = uniqUnion(duoCells, purposes)

    return allowedCount(trioCells) == 4
  })

  const knights = [first, second, third].map(k => k.cell)
  const cells = difference(trioCells, knights)

  return { knights, cells }
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
