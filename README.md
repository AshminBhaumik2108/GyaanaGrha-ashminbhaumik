# 🏙️ Gyaana-grha : Lifestyle-based Neighborhood Recommender Platform

***Gyaana-grha: A neighborhood fit engine for aspirants — because real estate is more than just rent. Unlike most real estate tools, Gyaana-grha focuses on aspirational fit, not just square footage or budget — this makes it a more intelligent first step in relocation and housing choices.***

**Gyaana-grha** is a web platform that **intelligently** matches **students and early-career professionals to neighborhoods** based on their **educational, professional, psychological**, and **lifestyle needs** using **live Public Datasets, Google Maps APIs, and AI Integration**.

**Example :** Many **Students** and **Young Professionals** relocate to new cities for **Education or Career opportunities**. However, choosing the **right neighborhood** often becomes **difficult** due to **lack of knowledge about the area**. This **platform aims** to **simplify that process** by providing **Personalized Neighborhood Suggestions** that match **user profiles** according to their needs and **book their Rent**.

---

## 🔗 Live URL

**Project Link :** [https://gyaanagrha-ashminbhaumik.vercel.app](https://gyaanagrha-ashminbhaumik.vercel.app)

> ⚠️ **IMPORTANT NOTE:**  
> ⏳ Please **wait ~40 seconds** for the **SERVER to start** when opening the website **(Please Refresh after ~40 seconds)**.  
> 🧑‍💻 Since the hosting is on a **free Render plan**, cold starts may cause a slight delay.   
> 🔴 Keep **Browser Zoom 80%** for better Experience
---

## 🎬 YouTube

**YouTube Demo Link :** [https://youtu.be/eKXGhH4lIZI?si=PsdhQOdTGJUFogOy](https://youtu.be/eKXGhH4lIZI?si=PsdhQOdTGJUFogOy)

---

## 🛠️ Tech Stack

| **Category**   | **Tools / Libraries**                             |
| -------------- | ------------------------------------------------- |
| **Frontend**   | React 19, Vite, React Router DOM, MUI             |
| **Backend**    | Node.js, Express.js, MongoDB Atlas, CORS          |
| **APIs**       | Google Maps, Mapbox GL JS, @react-google-maps/api |
| **AI Layer**   | Google Generative AI SDK (Gemini)                 |
| **Styling**    | Emotion, Vanilla CSS                              |
| **Deployment** | Vercel (Client), Render (Server)                  |
| **Utilities**  | Axios, Dotenv                                     |

---

## 🧩 Environment Variables Setup

You must set up **environment variables** for both the **client** and the **server** for the app to run successfully.

---

## 🖥️ Frontend: `.env` Format (Located : `./client-GyaanaGrha/.env`)

```env
VITE_BASE_URL = http://localhost:xxxx          # Base URL of your backend server
VITE_GOOGLE_MAP = <your-google-map-api-key>    # Google Maps JavaScript API Key
VITE_MAP_ID = <your-map-id>                    # Google Maps styled map ID (if applicable)
VITE_GEMINI_API_KEY = <your-gemini-api-key>    # Google Gemini AI API key
```

---

## 🗄️ Backend: `.env` Format (Located : `./server-GyaanaGrha/.env`)

```env
BASE_API_URL = https://api.data.gov.in/resource/  # Base Route URL
API_KEY = <your-secret-api-key>                   # API key : Govt Dataset KEY
MONGODB_URI = <your-mongodb-connection-uri>       # MongoDB Atlas or local URI
SERVER_DEVELOPMENT_URL = http://localhost:xxxx    # Dev URL used for CORS/configs
PORT = xxxx                                       # Port for backend server
APPLICATION = http://localhost:xxxx               # App name or identifier

```

---

## 📦 How to Clone and Run Locally

```bash
git clone https://github.com/AshminBhaumik2108/GyaanaGrha-ashminbhaumik.git
cd GyaanaGrha-ashminbhaumik
```

# ⚠️ API Behavior Notice – Gyaana-grha Platform

## 📌 Context

**GyaanaGrha** uses **Official Government of India APIs** to fetch **location and pincode-based data**, such as:

**LINK :** [All India Pincode Directory – data.gov.in](https://www.data.gov.in/resource/all-india-pincode-directory-till-last-month).   

This API serves as a **foundational dataset for powering features** such as **Neighborhood Fit Area**, **Search by Pincode**, and **Regional Filtering** in our platform.

---

## 🛑 Known Issue with API Responses

### ❗Problem

There are instances where the **government API** returns an **empty dataset** (`records: []`) from their end, even when **valid state, district, or pincode values are provided**.

### 📦 Example of Response:

```json
{
  "records": []
}
```
