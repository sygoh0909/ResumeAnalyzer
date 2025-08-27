# 📄 Resume Analyzer

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-blue?logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://vercel.com)
[![n8n](https://img.shields.io/badge/n8n-1.x-orange?logo=n8n)](https://n8n.io)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org)

A web application that analyzes and extracts insights from resumes using **Next.js (frontend)** and **n8n (automation workflow)**.
Users can upload their resume files, and the app processes them through a connected n8n workflow for parsing and AI-powered analysis.

## ✨ Features

- 🌐 **Frontend**: Built with Next.js, styled with TailwindCSS, deployed on Vercel
- ⚙️ **Backend Workflow**: Powered by n8n automation
- 📤 Upload resumes in PDF format
- 🧠 AI analysis via Google Palm / Gemini integration
- 📊 Extracts structured information: skills, education, experience, etc.

## 🛠️ How It Works

1. The **frontend** provides a file upload form.
2. The uploaded file is sent via **HTTP POST** to an **n8n webhook**.
3. The **n8n workflow** processes the resume:
   - Extracts text from the PDF/DOCX
   - Calls the AI model (Gemini/Google Palm) for analysis
   - Returns structured insights back to the frontend

⚠️ **Note**: The backend workflow (n8n) must be running—either locally (with ngrok) or deployed on a cloud service—to work.

## 📐 Architecture Diagram

```text
+-------------+       +----------------+       +----------------+       +-------------+
|   Frontend  | ----> |   n8n Webhook  | ----> |  Extract Text  | ----> |   AI Model  |
| (Next.js)   |       |  (Workflow)    |       |  (PDF/DOCX)    |       | (Gemini/LLM)|
+-------------+       +----------------+       +----------------+       +-------------+
        |
        |
        | <---------------- Structured Result (JSON/Text) ----------------+

```

## 🚀 Getting Started

### Clone the repo

```bash
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a .env.local file in the root folder:

```bash
NEXT_PUBLIC_API_URL=<your-n8n-webhook-url>
```

Example (when using ngrok):

```bash
NEXT_PUBLIC_API_URL=https://1234abcd.ngrok-free.app/webhook/file-upload
```

### Run the frontend locally

```bash
npm run dev
```

## 📥 Running the Workflow

### To run your own n8n backend

#### 1. Install n8n globally

```bash
npm install -g n8n
```

#### 2. Start n8n

```bash
n8n start
```

#### 3. Open the editor at http://localhost:5678

#### 4. Import the workflow file from this repo

resume-analyzer-workflow.json → Menu → Import → Paste JSON / Upload File

#### 5. Activate the workflow

#### 6. (Optional) Expose your local n8n using ngrok

```bash
ngrok http 5678
```

#### 7. Copy the ngrok URL and update .env.local in the frontend

## 🔑 Notes

- If you use someone else’s hosted workflow, it only works while their server is running.

- If you host your own workflow, you can run it locally or deploy n8n to a platform like Render/Railway.

- Don’t forget to set credentials inside n8n (e.g., Google Palm/Gemini API).

## 📌 Tech Stack & References

### Core Technologies

| Technology | Documentation |
|------------|---------------|
| [**Next.js**](https://nextjs.org) | [Official Docs](https://nextjs.org/docs) |
| [**TailwindCSS**](https://tailwindcss.com) | [Docs](https://tailwindcss.com/docs) |
| [**Vercel**](https://vercel.com) | [Docs](https://vercel.com/docs) |
| [**n8n**](https://n8n.io) | [Docs](https://docs.n8n.io/) |
| [**Node.js**](https://nodejs.org) | [API Docs](https://nodejs.org/en/docs/) |
| [**PostgreSQL**](https://www.postgresql.org) | [Docs](https://www.postgresql.org/docs/) |

### Additional References

| Technology | Documentation |
|------------|---------------|
| [Google Palm / Gemini API](https://developers.google.com) | AI analysis |
| [ngrok](https://ngrok.com) | Expose local n8n workflow |

## 👤 Author

Developed by Shu Yi ✨