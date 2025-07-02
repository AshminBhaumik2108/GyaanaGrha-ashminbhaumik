import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API...
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, // Use .env variable like Production..
});

// Generates content using Google Gemini AI...
async function generateAIContent(prompt) {
  try {
    const descPrompt = `You are a highly knowledgeable and articulate AI assistant. 
I will be asking you technical or conceptual questions related to software engineering, 
computer science, or related domains.

Please respond with:

- A clear and concise explanation
- A step-by-step breakdown where applicable
- Structured formatting using:
  - Headings
  - Numbered or bulleted lists
  - Code blocks or examples (if helpful)

Ensure your answers are well-organized, logically sequenced, 
and easy to understand — suitable for professional or academic audiences.

Now, provide a detailed and structured answer to the following query:

NOTE : Do not use the below strings in the text :
1. "*   **"
2. "#"
3. Any other special characters or symbols that are not relevant to the content.
4. If the Special is needed to use for the content, then use it. 
5. Do not use any emojis or smileys in the content.
6. Do not use any markdown formatting in the content.
7. Do not use any HTML formatting in the content.
8. Do not use any code blocks in the content unless it is necessary.

NOTE : Give the full Heading in Capital Letters..
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${descPrompt}, ${prompt}`,
              //   text: `${prompt}`,
            },
          ],
        },
      ],
    });

    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return text;
    } else {
      console.error("No text found in Gemini response:", result);
      return "No response text received from Gemini.";
    }
  } catch (error) {
    console.error("Error generating AI content:", error);
    return "Something went wrong. Please try again.";
  }
}

export default generateAIContent;
