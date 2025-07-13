
<h1 align="center">
  🚀 Filo
</h1>

<p align="center">
  <b>A modern file and text sharing platform</b><br/>
  Built with <code>Next.js</code>, <code>Supabase</code>, <code>Clerk Auth</code>, and <code>Tailwind CSS</code>.
</p>

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/DestinyDriver/Filo?style=flat-square">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/DestinyDriver/Filo?style=flat-square">
  <img alt="License" src="https://img.shields.io/github/license/DestinyDriver/Filo?style=flat-square">
</p>

---

## ✨ Overview

Filo is a dual-purpose tool for efficient file and text/code sharing.

- **FiloDrop**: Upload and protect files with short URLs, passwords, and share instantly via email.
- **FiloPad**: Lightweight public pastebin-style tool — no login required, just paste and share.

> 💡 Ideal for developers, teams, and creators looking for a fast and privacy-friendly sharing solution.

---

## 📸 Preview

| FiloDrop | FiloPad |
|:--------:|:-------:|
| ![Drop Screenshot](https://github.com/DestinyDriver/Filo/blob/main/asset/demo-filodrop.png) | ![Pad Screenshot](https://github.com/DestinyDriver/Filo/blob/main/asset/demo-filopad.png) |

---

## 🧪 Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Supabase (DB + Storage)
- **Authentication**: Clerk.dev
- **Styling**: Tailwind CSS + Lucide Icons 
- **Others**: Sonner (toasts), ShadCN UI

---

## 🔧 Getting Started

```bash
git clone https://github.com/DestinyDriver/Filo.git
cd Filo
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret
```

Then run the app:

```bash
npm run dev
```

---

## 🧠 PMI Diagram

![PMI Diagram](https://github.com/DestinyDriver/Filo/blob/main/asset/demo-flow.png)

> Architecture and flow of Filo app

---

## 🎥 Demo

[![Watch the video](https://img.youtube.com/vi/your-video-id/maxresdefault.jpg)](https://www.youtube.com/watch?v=your-video-id)

Click above to watch a short video demo of Filo in action.

---

## 🛠 Features

| Feature     | FiloDrop ✅ | FiloPad ✅ |
|-------------|-------------|------------|
| Auth required | ✅ | ❌ |
| Upload files | ✅ | ❌ |
| Share code/text | ❌ | ✅ |
| Short links | ✅ | ✅ |
| Password-protect | ✅ | ❌ |

---

## 🙌 Contributing

We welcome contributions! Fork the repo and submit a PR.

```bash
git checkout -b feature/feature-name
git commit -m "feat: add new feature"
git push origin feature/feature-name
```

Then open a PR on GitHub.

---

## 📄 License

Licensed under the **MIT License**.  
See [`LICENSE`](./LICENSE) for more.

---

> Made with ❤️ by [Your Name]
