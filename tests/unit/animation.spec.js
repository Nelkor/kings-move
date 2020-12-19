import {
  createAnimated,
  getAnimatedValue,
  updateAnimated,
} from '@engine/helpers/animation'

describe('sum', () => {
  test('values of animated should be equal to initial', () => {
    const initialValue = Math.random()
    const animated = createAnimated(initialValue)

    expect(animated.to == initialValue && animated.from == initialValue)
      .toBeTruthy()
  })

  test('getAnimatedValue should work correctly', () => {
    const item = {
      from: 0,
      to: 10,
      startedAt: 0,
      duration: 100,
    }

    expect(getAnimatedValue(item, 50)).toBe(5)
  })

  test('updateAnimated should work correctly', () => {
    const item = {
      from: 0,
      to: 10,
      startedAt: 0,
      duration: 100,
    }

    updateAnimated(item, 40, 50, 200)

    expect(getAnimatedValue(item, 60)).toBe(6.75)
  })
})
