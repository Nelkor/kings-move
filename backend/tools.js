const { knightsPurposes } = require('./knights')

const allowedCells = [6, 7, 8, 11, 13, 16, 17, 18]

const getSafePool = cell => knightsPurposes
  .filter(({ purposes }) => !purposes.includes(cell))

const getAttackers = cell => knightsPurposes
  .filter(({ purposes }) => purposes.includes(cell))

const randomFromArray = arr => arr[Math.floor(Math.random() * arr.length)]

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    {
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  return arr
}

const intersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x))
const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x))
const uniqUnion = (arr1, arr2) => [...new Set([...arr1, ...arr2])]
const allowedCount = cells => intersection(cells, allowedCells).length

module.exports = {
  allowedCells,
  getSafePool,
  getAttackers,
  randomFromArray,
  shuffle,
  uniqUnion,
  difference,
  allowedCount,
}
