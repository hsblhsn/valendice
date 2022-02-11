const randomString = (length: number): string => {
  return Math.random()
    .toString(36)
    .substr(2, length)
    .split('')
    .map((e) => (Math.random() < Math.random() ? e.toUpperCase() : e))
    .join()
    .replaceAll(',', '')
}

function serialize(obj: Record<string, any>): string {
  var str = []
  let fingerprint = localStorage.getItem('sink.fingerprint')
  if (fingerprint === null) {
    fingerprint = randomString(12)
    localStorage.setItem('sink.fingerprint', fingerprint)
  }
  obj['session'] = fingerprint
  obj['no_cache'] = randomString(4)
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
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
