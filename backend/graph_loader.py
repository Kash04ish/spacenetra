from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("NEO4J_URI")
user = os.getenv("NEO4J_USER")
password = os.getenv("NEO4J_PASSWORD")

missions = [
    {"name": "Chandrayaan-3", "year": 2023, "description": "India's successful lunar south pole mission."},
    {"name": "Mangalyaan", "year": 2013, "description": "India's first interplanetary mission to Mars."},
]

driver = GraphDatabase.driver(uri, auth=(user, password))

def load_missions():
    with driver.session() as session:
        for m in missions:
            session.run(
                """
                MERGE (m:Mission {name: $name})
                SET m.year = $year, m.description = $desc
                """,
                name=m["name"], year=m["year"], desc=m["description"]
            )
    print("✅ Mission data loaded successfully!")

if __name__ == "__main__":
    load_missions()
