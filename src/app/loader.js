export default function load_data(data) {
  if (typeof data != 'object') data = parse(data)
  
  // console.log(1)
  let keys = Object.keys(data),
  tags = {}
  /*
  // analysis
  keys.forEach(key => {
    if (data[key].tags) {
      let temp = data[key].tags.split(', ')

      temp.forEach(tag => {
        tags[tag] = (tags[tag] || 0) + 1
      })
      data[key].tags = temp
    } else data[key].tags = []
  });

  for (const tag in tags) {
    if (tags[tag] < 2) delete tags[tag]
  }
  tags = Object.keys(tags).filter(tag => tags[tag] > 1)

  // mutation
  keys.forEach(key => {
    let val = data[key]

    if (typeof val.urls !== 'object') val.urls = [ val.urls ]
    
    val.title = (val.tags || []).filter(tag => !tags.includes(tag))[0] || null
    if (val.title) val.tags = val.tags.filter(tag => tag != val.title)
 
    data[key] = val
  })
  */
  return [keys, data, { tags }]
}