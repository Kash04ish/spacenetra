# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import HTMLResponse
# from pydantic import BaseModel
# import openai
# import os
# import re
# from neo4j import GraphDatabase
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# # Initialize FastAPI app
# app = FastAPI()

# # Enable CORS for frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Use specific origin in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load API keys and Neo4j credentials
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# NEO4J_URI = os.getenv("NEO4J_URI")
# NEO4J_USER = os.getenv("NEO4J_USER")
# NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

# # Connect to Neo4j
# driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# # Pydantic input model
# class Query(BaseModel):
#     question: str

# # GPT fallback
# # import traceback

# # def ask_gpt(question: str) -> str:
# #     try:
# #         print("💡 Asking GPT with:", question)
# #         response = openai.ChatCompletion.create(
# #             model="gpt-3.5-turbo",
# #             messages=[
# #                 {"role": "system", "content": "You are a helpful ISRO assistant."},
# #                 {"role": "user", "content": question}
# #             ]
# #         )
# #         print("✅ GPT response received.")
# #         return response['choices'][0]['message']['content'].strip()

# #     except Exception as e:
# #         print("❌ OpenAI API Error:", e)
# #         traceback.print_exc()
# #         return "Sorry, I couldn't process that right now."

# from openai import OpenAI

# client = OpenAI()  # uses your OPENAI_API_KEY from env automatically

# def ask_gpt(question: str) -> str:
#     try:
#         print("💡 Asking GPT with:", question)
#         response = client.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful ISRO assistant."},
#                 {"role": "user", "content": question}
#             ]
#         )
#         print("✅ GPT response received.")
#         return response.choices[0].message.content.strip()

#     except Exception as e:
#         print("❌ OpenAI Error:", e)
#         import traceback
#         traceback.print_exc()
#         return f"❌ GPT Error: {e}"


# # Basic NLP to extract keyword
# def extract_mission_keyword(question: str) -> str:
#     patterns = [
#         r"\b(tell me about|what is|who is|explain|information about|details about|could you explain|give me info about)\b"
#     ]
#     cleaned = question.lower()
#     for pattern in patterns:
#         cleaned = re.sub(pattern, "", cleaned)
#     return cleaned.strip()

# # Neo4j query logic
# def query_neo4j(question: str) -> str:
#     year_match = re.search(r"\b(19|20)\d{2}\b", question)

#     with driver.session() as session:
#         if year_match:
#             year = int(year_match.group(0))
#             result = session.run(
#                 """
#                 MATCH (m:Mission)
#                 WHERE m.year = $year
#                 RETURN m.name AS name, m.description AS description, m.year AS year, m.type AS type
#                 ORDER BY m.name
#                 """,
#                 year=year
#             )
#             missions = [
#                 {
#                     "name": r["name"],
#                     "description": r["description"],
#                     "year": r.get("year"),
#                     "type": r.get("type")
#                 }
#                 for r in result if r["description"]
#             ]
#             if missions:
#                 return "\n\n".join([
#                     f"🛰️ {m['name']} ({m['year']}, {m['type']})\n📖 {m['description']}"
#                     for m in missions
#                 ])

#         # Clean query for name match
#         cleaned_question = extract_mission_keyword(question)

#         result = session.run(
#             """
#             MATCH (m:Mission)
#             WHERE toLower(m.name) CONTAINS toLower($q)
#               AND m.description IS NOT NULL
#             RETURN m.name AS name, m.description AS description, m.year AS year, m.type AS type
#             ORDER BY m.year
#             """,
#             q=cleaned_question
#         )
#         missions = [
#             {
#                 "name": r["name"],
#                 "description": r["description"],
#                 "year": r.get("year"),
#                 "type": r.get("type")
#             }
#             for r in result if r["description"]
#         ]
#         if missions:
#             return "\n\n".join([
#                 f"🛰️ {m['name']} ({m['year']}, {m['type']})\n📖 {m['description']}"
#                 for m in missions
#             ])

#         # Fallback suggestions
#         fallback_result = session.run(
#             """
#             MATCH (m:Mission)
#             WHERE toLower(m.name) CONTAINS toLower($q)
#             RETURN m.name AS name
#             LIMIT 3
#             """,
#             q=cleaned_question
#         )
#         suggestions = [r["name"] for r in fallback_result]
#         if suggestions:
#             return "No exact mission found. Did you mean:\n" + "\n".join([f"🔍 {name}" for name in suggestions])

#     return "No relevant mission found."

# # Root landing page
# @app.get("/", response_class=HTMLResponse)
# async def landing_page():
#     return """
#     <html>
#         <head><title>SpaceNetra API</title></head>
#         <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
#             <h1>🚀 Welcome to the SpaceNetra Backend API</h1>
#             <p>This is the backend for the SpaceNetra AI Bot.</p>
#             <p>Try the following endpoints:</p>
#             <ul style="list-style: none; padding-left: 0;">
#                 <li><a href="/missions-overview" target="_blank">📊 /missions-overview</a></li>
#                 <li><a href="/missions" target="_blank">📋 /missions</a></li>
#                 <li><code>POST</code> <code>/query</code> (use Postman or frontend)</li>
#             </ul>
#         </body>
#     </html>
#     """

# # Chatbot endpoint
# @app.post("/query")
# async def query_handler(query: Query):
#     neo_response = query_neo4j(query.question)
#     if "No relevant mission found." not in neo_response:
#         return {"answer": neo_response}

#     print("❗ Unanswered question logged:", query.question)
#     return {"answer": ask_gpt(query.question)}

# # Missions overview endpoint (for charts)
# @app.get("/missions-overview")
# async def overview():
#     query = """
#     MATCH (m:Mission)
#     RETURN m.name AS name, m.year AS year, m.type AS type, m.description AS description
#     ORDER BY m.year ASC
#     """
#     with driver.session() as session:
#         result = session.run(query)
#         return {
#             "missions": [
#                 {
#                     "name": r["name"],
#                     "year": r["year"],
#                     "type": r["type"],
#                     "description": r["description"]
#                 }
#                 for r in result
#             ]
#         }

# # Autocomplete mission list endpoint
# @app.get("/missions")
# async def all_missions():
#     query = "MATCH (m:Mission) RETURN m.name AS name ORDER BY m.name"
#     with driver.session() as session:
#         result = session.run(query)
#         return {"missions": [r["name"] for r in result]}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import os
import re
from neo4j import GraphDatabase
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load API keys and Neo4j credentials
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

# Connect to Neo4j
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# GPT Client
client = OpenAI()

# Input Model
class Query(BaseModel):
    question: str

# Hindi phrase to English mapping (basic)
hindi_to_english = {
    "मंगलयान": "Mangalyaan",
    "चंद्रयान": "Chandrayaan",
    "के बारे में बताओ": "tell me about",
    "जानकारी": "information",
    "क्या है": "what is",
    "बताओ": "tell me",
}

# Translate Hindi words (basic)
def translate_hindi_to_english(text: str) -> str:
    for hindi, eng in hindi_to_english.items():
        text = text.replace(hindi, eng)
    return text

# GPT fallback
def ask_gpt(question: str) -> str:
    try:
        print("💡 Asking GPT:", question)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful ISRO assistant."},
                {"role": "user", "content": question}
            ]
        )
        print("✅ GPT response received.")
        return response.choices[0].message.content.strip()
    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"❌ GPT Error: {e}"

# Extract core keyword
def extract_mission_keyword(question: str) -> str:
    patterns = [
        r"\b(tell me about|what is|who is|explain|information about|details about|could you explain|give me info about|know about|give details about)\b"
    ]
    cleaned = question.lower()
    for pattern in patterns:
        cleaned = re.sub(pattern, "", cleaned)
    cleaned = re.sub(r"[^\w\s]", "", cleaned)  # remove punctuation
    return cleaned.strip()

# Neo4j lookup
def query_neo4j(question: str) -> str:
    year_match = re.search(r"\b(19|20)\d{2}\b", question)

    # Handle queries ending with "mission" or "missions"
    if question.strip().lower().endswith((" mission", " missions")):
        with driver.session() as session:
            result = session.run(
                """
                MATCH (m:Mission)
                RETURN m.name AS name, m.year AS year, m.type AS type, m.description AS description
                ORDER BY m.year DESC
                LIMIT 5
                """
            )
            missions = [
                {
                    "name": r["name"],
                    "year": r["year"],
                    "type": r["type"],
                    "description": r["description"]
                }
                for r in result
            ]
            if missions:
                return "\n\n".join([
                    f"🛰️ {m['name']} ({m['year']}, {m['type']})\n📖 {m['description']}"
                    for m in missions
                ])

    with driver.session() as session:
        if year_match:
            year = int(year_match.group(0))
            result = session.run(
                """
                MATCH (m:Mission)
                WHERE m.year = $year
                RETURN m.name AS name, m.description AS description, m.year AS year, m.type AS type
                ORDER BY m.name
                """,
                year=year
            )
            missions = [
                {
                    "name": r["name"],
                    "description": r["description"],
                    "year": r.get("year"),
                    "type": r.get("type")
                }
                for r in result if r["description"]
            ]
            if missions:
                return "\n\n".join([
                    f"🛰️ {m['name']} ({m['year']}, {m['type']})\n📖 {m['description']}"
                    for m in missions
                ])

        cleaned_question = extract_mission_keyword(question)

        result = session.run(
            """
            MATCH (m:Mission)
            WHERE toLower(m.name) CONTAINS toLower($q)
              AND m.description IS NOT NULL
            RETURN m.name AS name, m.description AS description, m.year AS year, m.type AS type
            ORDER BY m.year
            """,
            q=cleaned_question
        )
        missions = [
            {
                "name": r["name"],
                "description": r["description"],
                "year": r.get("year"),
                "type": r.get("type")
            }
            for r in result if r["description"]
        ]
        if missions:
            return "\n\n".join([
                f"🛰️ {m['name']} ({m['year']}, {m['type']})\n📖 {m['description']}"
                for m in missions
            ])

        fallback_result = session.run(
            """
            MATCH (m:Mission)
            WHERE toLower(m.name) CONTAINS toLower($q)
            RETURN m.name AS name
            LIMIT 3
            """,
            q=cleaned_question
        )
        suggestions = [r["name"] for r in fallback_result]
        if suggestions:
            return "No exact mission found. Did you mean:\n" + "\n".join([f"🔍 {name}" for name in suggestions])

    return "No relevant mission found."

# Root route
@app.get("/", response_class=HTMLResponse)
async def landing_page():
    return """
    <html>
        <head><title>SpaceNetra API</title></head>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>🚀 Welcome to the SpaceNetra Backend API</h1>
            <p>This is the backend for the SpaceNetra AI Bot.</p>
            <p>Try the following endpoints:</p>
            <ul style="list-style: none; padding-left: 0;">
                <li><a href="/missions-overview" target="_blank">📊 /missions-overview</a></li>
                <li><a href="/missions" target="_blank">📋 /missions</a></li>
                <li><code>POST</code> <code>/query</code> (use Postman or frontend)</li>
            </ul>
        </body>
    </html>
    """

# POST /query chatbot endpoint
@app.post("/query")
async def query_handler(query: Query):
    translated_question = translate_hindi_to_english(query.question)
    print(f"🔍 Query: {query.question}")
    print(f"🌐 Translated: {translated_question}")

    neo_response = query_neo4j(translated_question)
    if "No relevant mission found" not in neo_response:
        return {"answer": neo_response}

    print("🤖 Falling back to GPT...")
    return {"answer": ask_gpt(query.question)}

# GET /missions-overview
@app.get("/missions-overview")
async def overview():
    query = """
    MATCH (m:Mission)
    RETURN m.name AS name, m.year AS year, m.type AS type, m.description AS description
    ORDER BY m.year ASC
    """
    with driver.session() as session:
        result = session.run(query)
        return {
            "missions": [
                {
                    "name": r["name"],
                    "year": r["year"],
                    "type": r["type"],
                    "description": r["description"]
                }
                for r in result
            ]
        }

# GET /missions
@app.get("/missions")
async def all_missions():
    query = "MATCH (m:Mission) RETURN m.name AS name ORDER BY m.name"
    with driver.session() as session:
        result = session.run(query)
        return {"missions": [r["name"] for r in result]}
