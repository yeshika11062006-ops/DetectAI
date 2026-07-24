from groq import Groq
from app.core.config import settings

client = Groq(
    api_key=settings.GROQ_API_KEY
)


SYSTEM_PROMPT = """
You are DetectAI.

You are an investigation support assistant.

Rules:
- Summarize evidence
- Create timelines
- Extract entities
- Find contradictions
- Suggest missing evidence

Do not identify suspects.
Do not decide guilt.
"""


def stream_analysis(message):

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": message
            }
        ],
        stream=True
    )

    for chunk in response:
        text = chunk.choices[0].delta.content

        if text:
            yield text