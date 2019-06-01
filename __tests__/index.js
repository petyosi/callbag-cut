import forEach from 'callbag-for-each'
import pipe from 'callbag-pipe'
import subject from 'callbag-subject'

import cut from '../src'

test('works', () => {
  const actual = []

  const source = subject()
  const separator = subject()

  pipe(
    source,
    cut(separator),
    forEach(values => {
      actual.push(values)
    }),
  )

  return Promise.resolve()
    .then(() => {
      expect(actual).toEqual([])
      source(1, 1)
      source(1, 2)
      source(1, 3)
    })
    .then(() => {
      expect(actual).toEqual([[1], [1, 2], [1, 2, 3]])
      source(1, 4)
      separator(1)
      expect(actual).toEqual([[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], []])
      separator(1)
      expect(actual).toEqual([[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [], []])
    })
    .then(() => {
      separator(1)
      expect(actual).toEqual([[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [], [], []])
      source(1, 5)
      source(1, 6)
      expect(actual).toEqual([
        [1],
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
        [],
        [],
        [],
        [5],
        [5, 6],
      ])
    })
    .then(() => {
      separator(1)
      expect(actual).toEqual([
        [1],
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
        [],
        [],
        [],
        [5],
        [5, 6],
        [],
      ])
    })
})
