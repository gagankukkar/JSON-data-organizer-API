const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 3000
const apiUrl = 'https://'
const {
  tagsParser,
  paramsParser,
  filterData,
  dataSorter
} = require('./helper')

app.use(express.json())

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Main Page' })
})

app.get('/api/ping', (req, res) => {
  res.status(200).json({ success: true })
})

app.get('/api/posts', (req, res) => {
  const tags = tagsParser(req.query)
  if (!tags) return res.status(400).json({ error: 'tags parameter is required' })

  const params = paramsParser(req.query)
  if (!params.sortBy) return res.status(400).json({ error: 'sortBy parameter is invalid' })

  if (!params.direction) return res.status(400).json({ error: 'direction parameter is invalid' })
   
  async function getAllData() {
    let response = ''
    try {
      response = await axios.all(tags.map((tag) =>
        axios.get(apiUrl, {'params': { 'tag': tag }})
      ))
    } catch (err) {
      return res.status(500).json({ error: err.response.data.error})
    }

    let postDataFiltered = []

    if (response.length > 1) {
      let postData = []

      for (val of response) {
        postData = [...postData, ...val.data.posts]
      }
      
      postDataFiltered = filterData(postData)
    } else {
      postDataFiltered = response[0].data.posts
    }

    dataSorter(params, postDataFiltered)

    res.status(200).json({ posts: postDataFiltered })
  }
  getAllData()
})
