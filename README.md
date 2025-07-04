Deployed Link: https://spacenetra-ncs7.vercel.app/
# SpaceNetra AI Bot
A smart ISRO assistant that retrieves mission data via Neo4j and answers queries with GPT fallback. Includes visual dashboards for mission analytics.

## Backend Setup
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # For Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## .env Files
- In `backend/.env`, add Neo4j and OpenAI keys
- In `frontend/.env`, set `VITE_BACKEND_API=http://localhost:8000`

## Neo4j Data Loading
```bash
python graph_loader.py
```

---

## Folder Structure
```
spacenetra-ai-bot/
├── backend/
│   ├── main.py
│   ├── graph_loader.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/components/
│   ├── src/pages/
│   ├── src/App.jsx
│   ├── src/index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env
├── docs/
│   └── feature_plan.pdf
└── README.md
```

## Credit
Made by Kashish Verma and team for Bharatiya Antariksh Hackathon 2025.
