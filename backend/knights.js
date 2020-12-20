const knightsPurposes = {
  0: [7, 11],
  1: [8, 10, 12],
  2: [5, 9, 11, 13],
  3: [6, 12, 14],
  4: [7, 13],
  5: [2, 12, 16],
  10: [1, 7, 17, 21],
  15: [6, 12, 22],
  20: [11, 17],
  21: [10, 12, 18],
  22: [11, 13, 15, 19],
  23: [12, 14, 16],
  24: [13, 17],
  9: [2, 12, 18],
  14: [3, 7, 17, 23],
  19: [8, 12, 22],
}

exports.knightsPurposes = Object.entries(knightsPurposes)
  .reduce((acc, [key, purposes]) => {
    acc.push({ cell: +key, purposes })

    return acc
  }, [])
