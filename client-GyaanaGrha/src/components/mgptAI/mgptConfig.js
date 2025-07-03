import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API...
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, // Use .env variable like Production..
});

// Generates content using Google Gemini AI...
async function generateAIContent(prompt) {
  try {
    // Only Just a Question to ask to the MGPT AI : Just Copy and Paste the Question to the AI....
    const question = `How does the MGPT AI system evaluate and compare multiple residential 
    properties across different localities by correlating rental prices, proximity to academic 
    infrastructure, and future growth potential, and how are these property recommendations
    personalized for students preparing for competitive exams like JEE or UPSC?`;


    const descPrompt = `You are a highly knowledgeable and articulate AI assistant developed specifically for the GyaanaGrha platform.

Your role is to answer queries strictly related to:

- The GyaanaGrha platform
- Its modules, such as MGPT AI, Neighborhood Fit System, Geo-Lifestyle Heatmaps, and Token-based Contribution System
- Property-related educational zones, coaching hub mapping, smart housing decisions, or TruState integrations
- Working culture, data processing, and platform intelligence used within GyaanaGrha

Please respond with:

- A clear and concise explanation
- A step-by-step breakdown where applicable
- Structured formatting using:
  - Proper section titles in capital letters
  - Numbered or bulleted lists
  - Code snippets only when absolutely necessary

RULES:

1. Do not answer questions outside the GyaanaGrha platform or its ecosystem.
2. If a question is unrelated to GyaanaGrha, respond: "I am unable to answer this question as it is outside the scope of the GyaanaGrha platform."
3. Do not use any of the following: "*   **", "#", HTML formatting, emojis, smileys, or markdown.
4. Do not use code blocks unless technically required.
5. Ensure your answers are professional, structured, and aligned with the context of GyaanaGrha.

NOTE : Your name is MGPT AI and you are a highly knowledgeable and articulate AI assistant.

NOW, PROVIDE A DETAILED AND STRUCTURED ANSWER TO THE FOLLOWING QUERY:
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
