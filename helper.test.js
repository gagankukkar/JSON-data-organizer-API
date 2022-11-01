const {
  tagsParser,
  paramsParser,
  filterData,
  dataSorter
} = require('./helper')

describe('tagsParser', () => {
  test('should return array with tag element', () => {
    const query = {
      tags: 'history'
    }
    expect(tagsParser(query)).toEqual(['history'])
  })

  test('should return array with multiple tag elements', () => {
    const query = {
      tags: 'history,tech,science'
    }
    expect(tagsParser(query)).toEqual(['history','tech','science'])
  })

  test('should return falsy when empty query supplied', () => {
    const query = {
      tags: ''
    }
    expect(tagsParser(query)).toBeFalsy()
  })
})

describe('paramsParser', () => {
  test('should return default params', () => {
    const query = {
      sortBy: '',
      direction: ''
    }
    expect(paramsParser(query)).toEqual({
      sortBy: 'id',
      direction: 'asc'
    })
  })

  test('should return specified sortBy param and default direction param', () => {
    const query = {
      sortBy: 'popularity'
    }
    expect(paramsParser(query)).toEqual({
      sortBy: 'popularity',
      direction: 'asc'
    })
  })

  test('should return specified sortBy and direction params', () => {
    const query = {
      sortBy: 'popularity',
      direction: 'desc'
    }
    expect(paramsParser(query)).toEqual({
      sortBy: 'popularity',
      direction: 'desc'
    })
  })

  test('should return default sortBy param and specified direction param', () => {
    const query = {
      direction: 'desc'
    }
    expect(paramsParser(query)).toEqual({
      sortBy: 'id',
      direction: 'desc'
    })
  })

  test('should return falsy params', () => {
    const query = {
      sortBy: 'hello',
      direction: 'world'
    }
    const paramsParsed = paramsParser(query)

    expect(paramsParsed.sortBy).toBeFalsy()
    expect(paramsParsed.direction).toBeFalsy()
  })
})

describe('filterData', () => {
  let data = [{
    "author": "Person 1",
    "authorId": 12,
    "id": 2,
    "likes": 469,
    "popularity": 0.68,
    "reads": 90406,
    "tags": [
      "startups",
      "tech",
      "history"
    ]
  },
  {
    "author": "Person 2",
    "authorId": 5,
    "id": 8,
    "likes": 735,
    "popularity": 0.76,
    "reads": 8504,
    "tags": [
      "culture",
      "history"
    ]
  },
  {
    "author": "Person 1",
    "authorId": 12,
    "id": 2,
    "likes": 469,
    "popularity": 0.68,
    "reads": 90406,
    "tags": [
      "startups",
      "tech",
      "history"
    ]
  }]

  test('should remove duplicate element', () => {
    const dataFiltered = [data[0], data[1]]
    expect(filterData(data)).toEqual(dataFiltered)
  })

  test('should return the same array with all unique elements', () => {
    data[2] = {
      "author": "Person 3",
      "authorId": 12,
      "id": 12,
      "likes": 490,
      "popularity": 0.85,
      "reads": 80706,
      "tags": [
        "startups",
        "tech"
      ]
    }
    const dataFiltered = [data[0], data[1], data[2]]
    expect(filterData(data)).toEqual(dataFiltered)
  })

  test('should return empty array', () => {
    data = []
    const dataFiltered = []
    expect(filterData(data)).toEqual(dataFiltered)
  })
})

describe('dataSorter', () => {
  let params = {
    sortBy: 'id',
    direction: 'asc'
  }
  let data = []

  test('should return empty array', () => {
    const emptyArray = []
    dataSorter(params, data)
    expect(data).toEqual(emptyArray)
  })

  test('should return same array with 1 element', () => {
    data = [{
      "author": "Person 1",
      "authorId": 12,
      "id": 2,
      "likes": 469,
      "popularity": 0.68,
      "reads": 90406,
      "tags": [
        "startups",
        "tech",
        "history"
      ]
    }]

    const oneElementArray = [{
      "author": "Person 1",
      "authorId": 12,
      "id": 2,
      "likes": 469,
      "popularity": 0.68,
      "reads": 90406,
      "tags": [
        "startups",
        "tech",
        "history"
      ]
    }]
    
    dataSorter(params, data)
    expect(data).toEqual(oneElementArray)
  })

  test('should sort by default params', () => {
    data = [{
      "author": "Person 2",
      "authorId": 5,
      "id": 8,
      "likes": 735,
      "popularity": 0.76,
      "reads": 8504,
      "tags": [
        "culture",
        "history"
      ]
    },
    {
      "author": "Person 1",
      "authorId": 12,
      "id": 2,
      "likes": 469,
      "popularity": 0.68,
      "reads": 90406,
      "tags": [
        "startups",
        "tech",
        "history"
      ]
    }]

    const sortedData = [{
      "author": "Person 1",
      "authorId": 12,
      "id": 2,
      "likes": 469,
      "popularity": 0.68,
      "reads": 90406,
      "tags": [
        "startups",
        "tech",
        "history"
      ]
    },
    {
      "author": "Person 2",
      "authorId": 5,
      "id": 8,
      "likes": 735,
      "popularity": 0.76,
      "reads": 8504,
      "tags": [
        "culture",
        "history"
      ]
    }]

    dataSorter(params, data)
    expect(data).toEqual(sortedData)
  })

  test('should sort by custom params', () => {
    params = {
      sortBy: 'likes',
      direction: 'desc'
    }

    const sortedData = [{
      "author": "Person 2",
      "authorId": 5,
      "id": 8,
      "likes": 735,
      "popularity": 0.76,
      "reads": 8504,
      "tags": [
        "culture",
        "history"
      ]
    },
    {
      "author": "Person 1",
      "authorId": 12,
      "id": 2,
      "likes": 469,
      "popularity": 0.68,
      "reads": 90406,
      "tags": [
        "startups",
        "tech",
        "history"
      ]
    }]
    
    dataSorter(params, data)
    expect(data).toEqual(sortedData)
  })
})
