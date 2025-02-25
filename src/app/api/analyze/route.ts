import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { answers } = await request.json();

  if (!answers) {
    return NextResponse.json({ message: 'No answers provided' }, { status: 400 });
  }

  // Convert answers into a formatted string for OpenAI analysis
  const formattedAnswers = Object.entries(answers)
    .map(([questionId, answer]) => `Question ${questionId}: Answer ${answer}`)
    .join('\n');

  try {
    const prompt = `You are an professional career consleur, analyze the answers to the questions of the user and chose the best IT career and give a brief explanation\n${formattedAnswers}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const analysis = response.choices[0].message?.content || 'No analysis available';
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error with OpenAI:', error);
    return NextResponse.json({ message: 'Error processing answers' }, { status: 500 });
  }
}
