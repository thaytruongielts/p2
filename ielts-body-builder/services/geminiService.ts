import { GoogleGenAI, Type, Schema } from "@google/genai";
import { EvaluationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const evaluationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    bandScore: {
      type: Type.NUMBER,
      description: "The estimated IELTS band score for the body paragraph (0-9, in 0.5 increments).",
    },
    feedback: {
      type: Type.OBJECT,
      properties: {
        taskResponse: { type: Type.STRING, description: "Feedback on Task Response." },
        coherenceCohesion: { type: Type.STRING, description: "Feedback on Coherence and Cohesion." },
        lexicalResource: { type: Type.STRING, description: "Feedback on Lexical Resource." },
        grammaticalRangeAccuracy: { type: Type.STRING, description: "Feedback on Grammatical Range and Accuracy." },
        overallComment: { type: Type.STRING, description: "A summary of the student's performance and main areas for improvement." },
      },
      required: ["taskResponse", "coherenceCohesion", "lexicalResource", "grammaticalRangeAccuracy", "overallComment"],
    },
    modelAnswer: {
      type: Type.STRING,
      description: "A Band 9 model body paragraph written in response to the same topic, addressing the same side of the argument if apparent.",
    },
    improvedVersion: {
      type: Type.STRING,
      description: "A rewritten version of the user's specific paragraph, keeping their original idea but elevating it to a Band 8+ or 9 level.",
    },
  },
  required: ["bandScore", "feedback", "modelAnswer", "improvedVersion"],
};

export const evaluateBodyParagraph = async (
  topic: string,
  userText: string
): Promise<EvaluationResult> => {
  try {
    const prompt = `
      Act as a senior IELTS Writing Examiner.
      
      Task: Evaluate the following "Body Paragraph" for an IELTS Writing Task 2 essay.
      
      Topic Question:
      "${topic}"
      
      Student's Body Paragraph:
      "${userText}"
      
      Instructions:
      1. Assess the paragraph based on the four IELTS criteria: Task Response (development of ideas), Coherence & Cohesion (linking words, flow), Lexical Resource (vocabulary), and Grammatical Range & Accuracy.
      2. Assign a Band Score (0.0 to 9.0).
      3. Provide constructive, specific feedback for each criterion.
      4. Write a NEW Band 9 model body paragraph for this topic (completely original).
      5. Write an IMPROVED version of the student's paragraph (polish their specific text).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: evaluationSchema,
        temperature: 0.7, // Slightly creative for the model answer, but structured for feedback
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from Gemini");
    }

    const result = JSON.parse(jsonText) as EvaluationResult;
    return result;
  } catch (error) {
    console.error("Error evaluating writing:", error);
    throw error;
  }
};
