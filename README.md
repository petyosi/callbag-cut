# callbag-cut

Mod of callbag buffer. Emits the buffered values until the separator emits a value, "cutting" the source.

## Example

```js
import cut from 'callbag-cut'
import forEach from 'callbag-for-each'
import fromEvent from 'callbag-from-event'
import map from 'callbag-map'
import pipe from 'callbag-pipe'

const btn = document.getElementById('#release')

pipe(
  fromEvent(document, 'click'),
  map(() => Math.floor(Math.random() * 100))
  cut(fromEvent(btn, 'click')),
  forEach(values => {
    console.log(values) // [86], [86, 93], [86, 93, 57], [], [64] ...
  })
)
```
