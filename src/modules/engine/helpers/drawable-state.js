import {
  createAnimated,
  getAnimatedValue,
  updateAnimated,
  createAnimatedUpdater,
} from './animation'

export const gridSideCount = 5

const state = {
  side: 0,
  zoom: createAnimated(1),
  backlights: Array.from({ length: gridSideCount ** 2 }).map(() => ({
    ...createAnimated(0),
    positive: true,
  })),
  king: {
    x: createAnimated(2),
    y: createAnimated(2),
    alpha: createAnimated(0),
  },
  knights: [],
}

const updateZoom = createAnimatedUpdater(state.zoom)
const updateKingAlpha = createAnimatedUpdater(state.king.alpha)

const cellToPoint = cell => [
  cell % gridSideCount,
  Math.floor(cell / gridSideCount),
]


// Разрешение
export const setSide = side => {
  state.side = side
}

export const getSide = () => state.side


// Зум
export const getZoom = time => getAnimatedValue(state.zoom, time)

export const zoomTo = (value, duration) => {
  updateZoom(value, duration)
}


// Подсветка
export const getBacklights = time => {
  const backlightsReducer = (acc, cur, index) => {
    const alpha = getAnimatedValue(cur, time)

    if (alpha) {
      acc.push({ point: cellToPoint(index), alpha, positive: cur.positive })
    }

    return acc
  }

  return state.backlights.reduce(backlightsReducer, [])
}

const updateBacklight = (index, to, duration, positive) => {
  const now = Date.now()
  const light = state.backlights[index]

  updateAnimated(light, to, now, duration)

  if (positive !== undefined) {
    light.positive = positive
  }
}

export const showHighlight = (cell, positive = true, duration = 100) => {
  updateBacklight(cell, 1, duration, positive)
}

export const hideHighlight = (cell, duration = 100) => {
  updateBacklight(cell, 0, duration)
}

export const showManyRedLights = (cells, duration) => {
  const now = Date.now()

  const cb = index => {
    const light = state.backlights[index]

    updateAnimated(light, 1, now, duration)

    light.positive = false
  }

  cells.forEach(cb)
}

export const hideAllHighlights = duration => {
  const now = Date.now()

  state.backlights.forEach(light => updateAnimated(light, 0, now, duration))
}


// Король
export const getKing = time => Object.entries(state.king)
  .reduce((acc, [key, item]) => {
    acc[key] = getAnimatedValue(item, time)

    return acc
  }, {})

export const moveKing = (cell, duration) => {
  const [x, y] = cellToPoint(cell)
  const now = Date.now()

  updateAnimated(state.king.x, x, now, duration)
  updateAnimated(state.king.y, y, now, duration)
}

export const hideKing = duration => {
  updateKingAlpha(0, duration)
}

export const showKing = duration => {
  updateKingAlpha(1, duration)
}


// Кони
export const removeKnights = () => {
  state.knights.length = 0
}

export const createKnight = cell => {
  const [x, y] = cellToPoint(cell).map(createAnimated)

  state.knights.push({ x, y })
}

export const getKnights = time => state.knights
  .map(({ x, y }) => [x, y].map(v => getAnimatedValue(v, time)))

export const moveKnight = (index, cell, duration) => {
  const [x, y] = cellToPoint(cell)
  const now = Date.now()
  const knight = state.knights[index]

  updateAnimated(knight.x, x, now, duration)
  updateAnimated(knight.y, y, now, duration)
}
