import { isInDrawer } from '../drawer';



test('isInDrawer when index is inside', () => {
  const result = isInDrawer({ drawSize: 10, side: 12, index: 3 })
  expect(result).toBeTruthy()
})

test('isInDrawer when index is outside', () => {
  const result = isInDrawer({ drawSize: 10, side: 12, index: 0 })
  expect(result).toBeFalsy()
})

test('isInDrawer with non-realistic index parameter', () => {
  const result = isInDrawer({ drawSize: 10, side: 12, index: 30 })
  expect(result).toBeFalsy()
})

test('isInDrawer with non-realistic side parameter', () => {
  const result = isInDrawer({ drawSize: 10, side: 5, index: 3 })
  expect(result).toBeTruthy()
})