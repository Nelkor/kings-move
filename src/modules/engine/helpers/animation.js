export const createAnimated = initialValue => ({
  from: initialValue,
  to: initialValue,
  startedAt: 0,
  duration: 0,
})

export const getAnimatedValue = (item, time) => {
  const passedTime = time - item.startedAt
  const passedPart = Math.min(1, passedTime / item.duration)
  const path = item.to - item.from

  return item.from + path * passedPart
}

export const updateAnimated = (item, to, time, duration) => {
  item.from = getAnimatedValue(item, time)
  item.to = to
  item.startedAt = time
  item.duration = duration
}

export const createAnimatedUpdater = item => (to, duration) => {
  const now = Date.now()

  updateAnimated(item, to, now, duration)
}
