import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_evidence(text: str):

    prompt = f"""
You are an AI Investigation Assistant.

Analyze this evidence.

Return ONLY valid JSON.

{{
    "summary":"",
    "people":[],
    "organizations":[],
    "locations":[],
    "dates":[],
    "keywords":[],
    "insights":[]
}}

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

    result = response.choices[0].message.content

    return json.loads(result)