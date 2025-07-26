# 📁 File Transfer App

This is a simple and secure File Transfer web application that allows users to upload files or folders and send them directly to a recipient's email. Built using **React + Vite**, with **Supabase** for file storage and **Mailgun** for sending email notifications.

---

## 🚀 Features

- ✅ Upload **files** or **folders** with drag & drop support.
- ✅ Stores files securely in **Supabase Storage**.
- ✅ Sends file access links to the recipient's **email using Mailgun**.
- ✅ Displays uploaded files with proper icons and file names.
- ✅ Responsive and minimal design.
- ✅ Confirmation popup on successful file transfer.

---

## 🛠 Tech Stack

- **Frontend**: React + Vite
- **Backend**: Supabase (Storage + Auth + Database)
- **Email Service**: Mailgun
- **Styling**: Normal CSS (Custom + Utility classes)
- **Deployment**: GitHub Pages / Vercel

---

## 📁 Project Structure

file-transfer/
├── client/ # React + Vite frontend
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/
│ │ │ ├── UploadForm.jsx # Upload + Email Form
│ │ │ └── FilePreview.jsx # Scrollable preview for uploaded files
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── vite.config.js
│
├── server/ # Express.js or Supabase edge functions
│ ├── mailgun.js # Logic for sending email
│ └── upload-handler.js # Optional server route for file handling
│
├── README.md
└── package.json

.yaml


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/file-transfer.git
cd file-transfer/client
```

### 2.  Install Dependencies

    npm install
    
### 3. Configure Supabase
  Go to Supabase.io and create a new project.
  
  Create a Storage Bucket named uploads.
  
  Enable Row-Level Security (RLS) if needed.
  
  Get your anon/public key and project URL.
  
  Add them to .env file in your client folder:
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key

###4. Configure Mailgun
  Sign up at Mailgun.
  
  Get your API key and domain.
  
  In your server or edge function (server/mailgun.js):
    const mailgun = require("mailgun-js");
    const mg = mailgun({ apiKey: "your-api-key", domain: "your-domain" });

🚧 Running Locally
  npm run dev
  The app will run at: http://localhost:5173

📦 Build & Deploy
  For GitHub Pages
  1. Set base in vite.config.js:
      base: "/your-repo-name/"
  2. Add a deploy script to package.json:
     "scripts": {
     "build": "vite build",
     "deploy": "vite build && gh-pages -d dist"
     }
  3. Deploy:
     npm run deploy

🤝 Contribution
Feel free to open issues or PRs to improve the app. Suggestions and bug reports are welcome!

📄 License
MIT License

🔗 Author
M. Ravikiran

GitHub: ravikiran-mothukuri


---

Let me know if you want to:
- Customize the project name or branding.
- Add Supabase table/structure info.
- Include command for Vercel or Netlify deployment.

Would you like the `server/` part (Mailgun integration) fully documented too in the README?
