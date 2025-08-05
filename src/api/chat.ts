// API route for OpenAI integration
// This would typically be implemented in your backend (Node.js, Python, etc.)

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Replace with your OpenAI API key
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // or 'gpt-4' for better responses
        messages: [
          {
            role: 'system',
            content: 'You are a helpful customer support assistant. Be friendly, professional, and concise in your responses.'
          },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    return new Response(JSON.stringify({ 
      message: assistantMessage 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to process chat request',
      message: 'I apologize, but I\'m experiencing technical difficulties. Please try again later or contact our support team.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Example environment variables needed:
// OPENAI_API_KEY=your_openai_api_key_here