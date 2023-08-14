import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = "edge"

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
})

const openai = new OpenAIApi(apiConfig)

const podcasts = [
  "Morning Joe",
  "The MinnMax Show",
  "Pod Save America",
  "Sci Show Tangents",
  "Smartless",
  "Behind the Bastards",
]

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  // const { prompt } = await req.json()

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `I am going to give you an array of my favorite podcasts.
        Adopt the persona of someone who who like these shows.
        Provide your persona's name, age, occupation, and interests.
        As that persona, answer the following questions delimited by triple quotes:
        """1. Do you believe in astrology?
        2. What was your high school gpa?
        3. Were your parents divorced?"""`,
      },
      {
        role: "user",
        content: `${podcasts}`,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
