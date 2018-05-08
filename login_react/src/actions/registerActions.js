export function registered(msg) {
  return {
    type: 'REGISTERED',
    payload: msg
  }
}