import fs from 'fs/promises'
import axios from 'axios'

export { handleSamples } from './samples'
export { handleServer } from './server'

export const submit = async (id: string, problem: string, path: string) => {
  const code = await fs.readFile(path, 'utf-8')
  await axios({
    url: 'http://localhost:8000/submit',
    method: 'POST',
    data: { id, problem, code },
  })
  console.log('Code submitted successfully')
}
