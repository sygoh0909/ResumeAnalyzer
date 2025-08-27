
# 📄 Resume Analyzer

A web app that helps analyze and extract insights from resumes using **Next.js (frontend)** and **n8n (automation workflow)**.  
Users can upload their resume files, and the app processes them through a connected n8n workflow for parsing and AI-powered analysis.  

---

## ✨ Features

- 🌐 **Frontend**: Built with Next.js and deployed on Vercel
- ⚙️ **Backend Workflow**: Powered by n8n automation
- 📤 Upload resumes (PDF/DOCX)
- 🧠 AI analysis via Google Palm / Gemini integration
- 📊 Extracts structured info (skills, education, experience, etc.)

---

## 🛠️ How It Works

1. The **frontend** (Vercel-hosted Next.js) provides a file upload form.
2. The uploaded file is sent via **HTTP POST request** to an **n8n webhook**.
3. The **n8n workflow** processes the resume:
   - Extracts text from the PDF/DOCX
   - Calls AI model (Gemini) for analysis
   - Returns structured insights back to the frontend

⚠️ **Note**: The backend workflow (n8n) is currently self-hosted. That means it only works if the workflow owner is running it locally with ngrok or has deployed it on a cloud service.

---

## 📐 Architecture Diagram

```text
+-------------+       +----------------+       +----------------+       +-------------+
|   Frontend  | ----> |   n8n Webhook  | ----> |  Extract Text  | ----> |   AI Model  |
| (Next.js)   |       |  (Workflow)    |       |  (PDF/)        |       | (Gemini/LLM)|
+-------------+       +----------------+       +----------------+       +-------------+
        |
        |
        | <---------------- Structured Result (JSON/Text) -------------+
```

---

## 🚀 Getting Started

Clone the repo

```bash
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer
```

Install dependencies

```bash
npm install
```

Configure environment variables
Create a .env.local file in the root folder:

```bash
NEXT_PUBLIC_API_URL=<your-n8n-webhook-url>
```

Example (when using ngrok):

```bash
NEXT_PUBLIC_API_URL=https://1234abcd.ngrok-free.app/webhook/file-upload
```

Run locally

```bash
npm run dev
```

## 📥 Running the Workflow

If you want to run your own n8n backend:

1.Install n8n globally:

```bash
npm install -g n8n
```

2.Start n8n:

```bash
n8n start
```

3.Open the editor at http://localhost:5678

4.Import the workflow file from this repo:

resume-analyzer-workflow.json → Menu → Import → Paste JSON / Upload File

5.Activate the workflow.

6.Run ngrok to expose your local n8n:

```bash
ngrok http 5678
```

7.Copy the ngrok URL and update your .env.local in the frontend.

## 🔑 Notes

If you use someone else’s hosted workflow, it only works while their server is running.

If you host your own workflow, you can run it locally or deploy n8n to a platform like Render/Railway.

Don’t forget to set credentials inside n8n (e.g., Google Palm/Gemini API).

## 📌 Tech Stack

Frontend: Next.js, TailwindCSS, Vercel

Automation Backend: n8n

AI Model: Google Palm / Gemini

## 👤 Author

Developed by Shu Yi ✨