export default function cut(separator) {
  return source => (start, sink) => {
    if (start !== 0) return

    let sourceTalkback
    let separatorTalkback
    let buffer = []

    source(0, (type, data) => {
      if (type === 0) {
        sourceTalkback = data

        sink(0, (type, data) => {
          if (type === 2) {
            sourceTalkback(2)
            separatorTalkback(2)
            return
          }
          sourceTalkback(type, data)
        })
        return
      }

      if (type === 1) {
        buffer.push(data)
        sink(1, buffer.slice())
        return
      }

      if (type === 2) {
        separatorTalkback(2)
      }

      sink(type, data)
    })

    separator(0, (type, data) => {
      if (type === 0) {
        separatorTalkback = data
        return
      }
      buffer = []
      sink(1, buffer.slice())
    })
  }
}
