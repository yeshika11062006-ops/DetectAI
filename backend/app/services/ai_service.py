import os
import json

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# ---------------------------------------------------
# AI Evidence Analysis
# ---------------------------------------------------

def analyze_document(text: str):

    prompt = f"""
You are an AI Investigation Assistant.

Analyze the following investigation evidence.

Return ONLY valid JSON in exactly this format:

{{
  "summary": "",
  "people": [],
  "organizations": [],
  "locations": [],
  "dates": [],
  "keywords": [],
  "insights": [
    ""
  ],
  "timeline": [
    {{
      "date": "",
      "event": ""
    }}
  ]
}}

Instructions:
- Write a concise investigation summary.
- Extract all people mentioned.
- Extract organizations.
- Extract locations.
- Extract dates.
- Extract important investigation keywords.
- Generate 3 to 6 investigation insights.
- Build a chronological timeline of important events.
- Return ONLY valid JSON.

Evidence:

{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    content = response.choices[0].message.content

    content = (
        content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        return json.loads(content)

    except Exception:

        return {
            "summary": content,
            "people": [],
            "organizations": [],
            "locations": [],
            "dates": [],
            "keywords": [],
            "insights": [],
            "timeline": []
        }


# ---------------------------------------------------
# Streaming AI Response
# ---------------------------------------------------

def stream_analysis(text: str):

    prompt = f"""
You are DetectAI AI Assistant.

Analyze the following evidence.

Evidence:

{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
        stream=True
    )

    for chunk in response:

        if (
            chunk.choices
            and chunk.choices[0].delta
            and chunk.choices[0].delta.content
        ):
            yield chunk.choices[0].delta.content


# ---------------------------------------------------
# Chat with Evidence
# ---------------------------------------------------

def chat_with_evidence(evidence: str, question: str):

    prompt = f"""
You are DetectAI, an AI Investigation Assistant.

Evidence:

{evidence}

Question:

{question}

Instructions:
- Answer ONLY using the uploaded evidence.
- If the answer is not present, reply:
  "Information not found in the uploaded evidence."
- Keep the answer concise and professional.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content