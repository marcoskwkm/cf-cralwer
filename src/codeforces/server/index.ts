import express from 'express'

import { init, submitCode } from './browser'

const app = express()
app.use(express.json())

app.get('/test', (_, res) => {
  res.json('Hello, world!').send()
})

app.post('/submit', async (req, res) => {
  const { id, problem, code } = req.body
  await submitCode(id, problem, code)
  res.status(200).send()
})

export const handleServer = () => {
  app.listen({ port: 8000 }, () => {
    init().then(() => {
      console.log('Server running at http://localhost:8000')
    })
  })
}
