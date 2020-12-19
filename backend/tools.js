const { knightsPurposes } = require('./knights')

exports.getSafePool = cell =>
  knightsPurposes.filter(({ purposes }) => !purposes.includes(cell))

exports.getAttackers = cell =>
  knightsPurposes.filter(({ purposes }) => purposes.includes(cell))

exports.randomFromArray = arr => arr[Math.floor(Math.random() * arr.length)]

exports.shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    {
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  return arr
}

exports.intersection = (arrA, arrB) => arrA.filter(x => arrB.includes(x))
