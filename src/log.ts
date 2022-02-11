function serialize(obj: Record<string, any>): string {
  var str = []
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}

export default function log(data: Record<string, any>): void {
  try {
    const out = serialize(data)
    fetch(`/sink.json?data=${out}`, {
      method: 'GET',
    }).catch((err) => {
      console.error(err)
    })
  } catch (err) {
    console.error(err)
    return
  }
}
