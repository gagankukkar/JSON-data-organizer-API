function tagsParser(query) {
  let tags = []
  if (query.tags) {
    tags = query.tags.split(',')
  } else {
    return null
  }
  return tags
}

function paramsParser(query) {
  let paramsParsed = {}
  let sortByFields
  let directionFields

  if (query.sortBy) sortByFields = ['id', 'reads', 'likes', 'popularity']
  else paramsParsed.sortBy = 'id'

  if (query.direction) directionFields = ['asc', 'desc']
  else paramsParsed.direction = 'asc'

  for (field of [sortByFields, directionFields]) {
    if (field && field.includes(query.sortBy)) {
      paramsParsed.sortBy = query.sortBy

    } else if (field && field.includes(query.direction)) {
      paramsParsed.direction = query.direction

    }
  }
  return paramsParsed
}

function filterData(data) {
  const uniqueIds = new Set()

  const dataFiltered = data.filter((val) => {
    const isDuplicate = uniqueIds.has(val.id)
    uniqueIds.add(val.id)

    if (!isDuplicate) {
      return true
    }

    return false
  })
  return dataFiltered
}

function dataSorter(params, data) {
  if (params.direction === 'asc') {
    data.sort((a, b) => {
      return a[params.sortBy] - b[params.sortBy]
    })
  } else {
    data.sort((a, b) => {
      return b[params.sortBy] - a[params.sortBy]
    })
  }
}

module.exports = {
  tagsParser,
  paramsParser,
  filterData,
  dataSorter
}