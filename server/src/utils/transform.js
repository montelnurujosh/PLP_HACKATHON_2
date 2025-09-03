function asClient(doc) {
  if (!doc) return doc
  const obj = { ...doc }
  if (obj._id && !obj.id) obj.id = String(obj._id)
  delete obj._id
  delete obj.__v
  return obj
}

function asClientArray(arr) {
  return Array.isArray(arr) ? arr.map((d) => asClient(d)) : []
}

module.exports = { asClient, asClientArray }




