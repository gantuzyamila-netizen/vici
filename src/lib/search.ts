// Compara sin mayúsculas ni tildes ("cafe" encuentra "Café")
export const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

export const matches = (query: string, ...fields: string[]) => {
  const q = normalize(query)
  return q.length > 0 && fields.some((field) => normalize(field).includes(q))
}
