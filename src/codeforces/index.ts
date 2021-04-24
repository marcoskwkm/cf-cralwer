import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs/promises'

import { CPP_TEMPLATE_PATH, MAKEFILE } from '../constants'
import { ensureNewLineAtEndOfString } from '../utils'

const BASE_URL = 'https://codeforces.com'

const getProblemSamples = async (url: string) => {
  const resp = await axios.get(url)
  const $ = cheerio.load(resp.data)

  const input: string[] = []
  $('.sample-test > .input > pre').each((_, el) => {
    input.push(ensureNewLineAtEndOfString($(el).text()))
  })

  const output: string[] = []
  $('.sample-test > .output > pre').each((_, el) => {
    output.push(ensureNewLineAtEndOfString($(el).text()))
  })

  return { input, output }
}

const getProblemUrls = async (url: string) => {
  const resp = await axios.get(url)
  const $ = cheerio.load(resp.data)

  const urls: { label: string; url: string }[] = []
  $('.problems tr > td:first-child a').each((_, el) => {
    urls.push({
      label: $(el).text().trim(),
      url: BASE_URL + $(el).attr('href')!,
    })
  })

  return urls
}

const processProblem = async (problem: { label: string; url: string }) => {
  const problemFolder = `./${problem.label}`
  const samplesPromise = getProblemSamples(problem.url)
  await fs.mkdir(problemFolder)

  const pendingPromises = []
  pendingPromises.push(
    fs.copyFile(CPP_TEMPLATE_PATH, `${problemFolder}/sol.cpp`)
  )
  pendingPromises.push(fs.writeFile(`${problemFolder}/Makefile`, MAKEFILE))

  const { input, output } = await samplesPromise
  input.forEach((file, index) =>
    pendingPromises.push(
      fs.writeFile(`${problemFolder}/sample.in${index}`, file)
    )
  )
  output.forEach((file, index) =>
    pendingPromises.push(
      fs.writeFile(`${problemFolder}/sample.out${index}`, file)
    )
  )

  await Promise.all(pendingPromises)
  console.log(`Finished processing problem ${problem.label}`)
}

export const handleCodeforces = async (id: string | undefined) => {
  if (!id) {
    console.error('An id must be provided for Codeforces contests')
    process.exit(-1)
  }

  console.log(`Crawling samples from Codeforces #${id}...`)
  const problems = await getProblemUrls(BASE_URL + `/contest/${id}`)
  console.log(`Found ${problems.length} problems`)
  await Promise.all(problems.map((problem) => processProblem(problem)))
}
