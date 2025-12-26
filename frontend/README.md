# CodeCrush AI Frontend 🚀

The frontend of CodeCrush AI — a modern web platform that helps developers discover and connect with like-minded devs based on their skills, interests, and projects. Built with React (Vite), Tailwind CSS, and DaisyUI, this interface offers a clean, responsive, and engaging user experience with integrated AI onboarding assistant.

🌐 **Live Project:** [DevTinder](https://devtinder.rocks/)

---

## ✨ Features

- ⚡ Fast Vite + React.js setup
- 🎨 Tailwind CSS + DaisyUI theming
- 🔐 Login, Signup, Logout with cookie-based auth
- 👤 View and edit user profiles
- 🧠 Smart matching feed based on skills/interests
- 💬 AI Assistant: DevBuddy (powered by OpenAI)
- 🤝 Send & receive interest requests
- 🔄 Accept / reject requests, view connections
- 📱 Responsive mobile-first design
- 🌙 Dark mode (DaisyUI "business" theme)

---

## 🛠️ Tech Stack

- React + Vite
- Tailwind CSS v3.4 + DaisyUI
- Axios
- React Router
- Redux Toolkit (optional, if used)
- OpenAI API (via backend)
- Toastify / animations for UX feedback

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Shams261/DevTinder-frontend.git
cd DevTinder-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

## 🤖 DevBuddy (AI Assistant)

DevBuddy is an integrated AI assistant powered by OpenAI. It helps users with:

- Onboarding guidance
- Platform usage tips
- General queries related to connecting with developers

🧭 **Accessible via:**
- The `/assistant` route
- A floating assistant button on feed/profile pages

⚙️ **Technical Note:**
- Uses OpenAI’s GPT-3.5 Turbo model
- Optimized for low token cost and fast responses

## 🔧 API Endpoints

The frontend interacts with the backend API hosted in the [DevTinder](https://github.com/Shams261/DevTinder). Ensure the backend is running before using the frontend.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project, follow these steps:

1. **Fork** the repository  
2. **Clone** your fork locally  
3. Create your feature branch:  
   ```bash
   git checkout -b feature/amazing-feature
   ```
4.	Make your changes and commit:
   ```bash
   git commit -m "Add some amazing feature"
   ```
5.	Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```

  6.	Open a Pull Request and describe your changes


## 📜 License
This project is open-source and available under the **MIT License**.










