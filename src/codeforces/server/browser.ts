import puppeteer from 'puppeteer'
import prompt from 'prompt'

import { BASE_URL } from '../constants'

let browser: puppeteer.Browser | null = null

export const init = async () => {
  prompt.start()
  const { username, password } = await prompt.get([
    {
      name: 'username',
      required: true,
    },
    {
      name: 'password',
      hidden: true,
    },
  ] as any)

  process.stdout.write('Logging in...')
  browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(BASE_URL + '/enter')
  await page.type('#handleOrEmail', username as string)
  await page.type('#password', password as string)
  await Promise.all([page.waitForNavigation(), page.click('.submit')])
  if ((await page.content()).match(/invalid.*password/i)) {
    console.error('Invalid username or password')
    process.exit(-1)
  } else if ((await page.content()).match(/logout/)) {
    console.log(' Success!')
  } else {
    console.error('Login failed')
    process.exit(-1)
  }
}

export const submitCode = async (id: string, problem: string, code: string) => {
  const page = await browser!.newPage()
  await page.goto(`${BASE_URL}/contest/${id}/submit`)
  await page.select('select[name="submittedProblemIndex"]', problem)
  await page.select('select[name="programTypeId"]', '54')
  await page.type('#sourceCodeTextarea', code)
  await Promise.all([page.waitForNavigation(), page.click('.submit')])
}
