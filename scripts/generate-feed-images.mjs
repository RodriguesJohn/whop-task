/**
 * Generates feed images via OpenAI Images API (DALL·E 3).
 * Reads OPENAI_API_KEY from .env — never commit .env.
 *
 * Usage: npm run generate:images
 * Output: public/feed/*.png (referenced by src/App.jsx MIXED_FEED)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
dotenv.config({ path: path.join(root, '.env') })

const apiKey = process.env.OPENAI_API_KEY?.trim()
const outDir = path.join(root, 'public', 'feed')

/** @type {{ out: string, prompt: string }[]} */
const JOBS = [
  {
    out: 'd1-trade-academy.png',
    prompt:
      'Abstract dark-mode trading illustration: candlestick chart, soft blue and amber glow, minimal UI, no text, no logos, 1:1 square, polished mobile app aesthetic.',
  },
  {
    out: 'd2-kiss-ai.png',
    prompt:
      'Cozy desk at night: laptop screen showing a subtle upward analytics curve, warm desk lamp, purple accent lighting, shallow depth of field, photorealistic, no readable text or logos, square crop.',
  },
  {
    out: 't1-maya-palo-alto.png',
    prompt:
      'Vertical social video thumbnail vibe: creator on a sunny tree-lined street holding a smartphone, excited friendly expression, cinematic natural light, generic orange app tile on phone (no brand names), square composition.',
  },
  {
    out: 't2-aria-meme.png',
    prompt:
      'Single-panel internet meme image about earning money online: bold impact font energy, absurd funny tone, dark charcoal background, saturated accent colors, no real logos or trademarked characters, square.',
  },
  {
    out: 'd3-remarkable-picks.png',
    prompt:
      'Dark moody collage of stylized betting slip tickets and green checkmarks, dramatic spotlight, sports-picks energy, no readable bookmaker names, square, high contrast.',
  },
  {
    out: 't3-leo-story.png',
    prompt:
      'Close-up smartphone in hand showing a generic story composer UI with a link sticker and blurred background, night mode OLED blacks, no readable brand text, square.',
  },
  {
    out: 'l1-trapline.png',
    prompt:
      'Dark premium abstract gradient with soft blue accent, subtle paper-plane motif, mysterious invite-card feel, no text, square, minimal.',
  },
]

async function createImage(prompt) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt.slice(0, 3500),
      n: 1,
      size: '1024x1024',
      response_format: 'url',
      quality: 'standard',
    }),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`OpenAI ${res.status}: ${text}`)
  }
  const json = JSON.parse(text)
  const url = json.data?.[0]?.url
  if (!url) throw new Error(`Unexpected response: ${text.slice(0, 500)}`)
  return url
}

async function downloadToFile(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
}

async function main() {
  if (!apiKey) {
    console.error('Missing OPENAI_API_KEY in .env — add your key and try again.')
    process.exit(1)
  }

  fs.mkdirSync(outDir, { recursive: true })

  console.log(`Generating ${JOBS.length} images into public/feed/ …`)

  for (let i = 0; i < JOBS.length; i++) {
    const job = JOBS[i]
    const dest = path.join(outDir, job.out)
    process.stdout.write(`[${i + 1}/${JOBS.length}] ${job.out} … `)
    try {
      const url = await createImage(job.prompt)
      await downloadToFile(url, dest)
      console.log('ok')
    } catch (e) {
      console.error('failed:', e.message)
      process.exitCode = 1
      break
    }
    if (i < JOBS.length - 1) await new Promise((r) => setTimeout(r, 1500))
  }

  if (!process.exitCode) console.log('Done. Restart dev server if it was running.')
}

main()
