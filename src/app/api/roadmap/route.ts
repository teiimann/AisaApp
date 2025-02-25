// src/app/api/roadmap/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { topic } = await request.json();

  if (!topic || typeof topic !== 'string') {
    return NextResponse.json({ message: 'Invalid topic provided' }, { status: 400 });
  }

  try {
    const prompt = `Create a step-by-step learning roadmap for the topic "${topic}". Provide each step with a title and a brief description.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const roadmapText = response.choices[0].message?.content;
    return NextResponse.json({ roadmap: roadmapText });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return NextResponse.json({ message: 'Error generating roadmap' }, { status: 500 });
  }
}
