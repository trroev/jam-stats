import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = "edge"

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
})

const openai = new OpenAIApi(apiConfig)

const bands = [
  "Thee Oh Sees",
  "Ty Segall",
  "La Luz",
  "The Brian Jonestown Massacre",
  "Cage the Elephant",
  "Black Lips",
  "Allah-Lahs",
  "King Gizzard and the Lizard Wizard",
  "Parquet Courts",
  "The Murlocs",
]

// function buildPrompt(prompt: string) {
//   return prompt.split("\n").map((message) => ({
//     role: "user",
//     content: message,
//   }))
// }

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
        content: `When I give you an array of my favorite bands, will you generate 5 recommendations for bands based on the given array.
        The recommendations that you give should be unique, and not included in the given array.
        Provide a short summary explaining why you are making the recommendation.
        Adopt the persona of a music snob, making sure to tease me about my favorite bands in a playful way.
        Provide a link to each recommadations spotify artist page.`,
      },
      {
        role: "user",
        content: `${bands}`,
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
