export const getGameResult = async cell => {
  const res = await fetch(`/api/${cell}`)

  return res.json()
}
