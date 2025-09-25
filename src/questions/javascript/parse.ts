import fs from 'fs'
import path from 'path'

// javascript-questions by Lydia Hallie
// https://github.com/lydiahallie/javascript-questions/blob/master/README.md

const questionsRaw = fs.readFileSync(path.resolve(import.meta.dirname, 'questions.md')).toString()
const questionsJsonPath = path.resolve(import.meta.dirname, 'js-questions.json')

const regex =
  /#+\s+(\d+).\s+(.+\??)\s+([\s\S]+[^\s])\s+(- A[\s\S]+)\s+<details>[\s\S]+#+ Answer: ([A-Z])\s+([\s\S]+[^\s])\s+<\/p>/

const questionsParsed = questionsRaw.split(`\n---\n`).map((rawQuestion, index) => {
  const match = rawQuestion.match(regex)

  if (!match) {
    throw new Error(`No match found on question ${index + 1}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, id, question, code, rawVariants, answer, explanation] = match

  const variants = rawVariants
    .split('\n')
    .filter(Boolean)
    .map((rawVariant) => {
      const variantMatch = rawVariant.match(/- ([A-Z]):\s*([\s\S]+)/)

      if (!variantMatch) {
        throw new Error(`No match found on variant '${rawVariant}'`)
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, letter, variant] = variantMatch

      return { letter, variant }
    })

  return {
    id,
    question,
    code,
    variants,
    answer,
    explanation,
  }
})

fs.writeFileSync(questionsJsonPath, JSON.stringify(questionsParsed))
