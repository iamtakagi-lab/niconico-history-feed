export default (a, b) => {
  return a.slice(1, a.length).filter((item) => JSON.stringify(b).indexOf(JSON.stringify(item)) < 0)
}
