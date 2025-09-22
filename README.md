# Registration & Company Management System

This project was developed as part of the **Bluestock Warm-up Assignment**.  
It includes a **backend** (Node.js + Express + PostgreSQL) and a **frontend** (React + Redux + Vite).  

---

## 🚀 Features
- User **Registration** (with hashed password using bcryptjs).
- User **Login & Authentication** (JWT-based).
- **Company Management**:
  - Create, View, Update, Delete companies.
  - Users can only modify their own companies.
  - Other companies are visible in **read-only mode**.
- Secure APIs with **JWT middleware**.
- Responsive **React frontend** integrated with backend.
- Deployment on:
  - Backend → **Render**
  - Frontend → **Vercel**
- PostgreSQL database hosted on **Render**.

---

## 🛠 Tech Stack
### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (Authentication)
- Bcryptjs
- Helmet, CORS

### Frontend
- React (with Vite)
- Redux Toolkit
- Axios
- Bootstrap (for UI)

### Deployment
- **Render** (Backend + Database)
- **Vercel** (Frontend)

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Gampasani/Registration.git
cd Registration
```

### 2. Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@<host>:5432/<db>
JWT_SECRET=supersecretjwt
```

* Run backend locally:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

* Update **axios.js** API base URL:

```js
const api = axios.create({
  baseURL: "https://registration-backend-xxxxx.onrender.com/api",
});
```

* Run frontend locally:

```bash
npm run dev
```

---

## 🌐 Deployment Links

* **Backend (Render)**: [https://registration-backend-m51u.onrender.com](https://registration-backend-m51u.onrender.com)
* **Frontend (Vercel)**: [https://registration-mu-opal.vercel.app](https://registration-mu-opal.vercel.app)
* **Demo Video (Google Drive)**: [https://drive.google.com/file/d/1wub2y3AU_IZZZUZQgt0omsLqKwnEy6F2/view?usp=drivesdk](https://drive.google.com/file/d/1wub2y3AU_IZZZUZQgt0omsLqKwnEy6F2/view?usp=drivesdk)

---

## 🗄 Database Schema

### Users Table

| Column              | Type      | Notes            |
| ------------------- | --------- | ---------------- |
| id                  | SERIAL PK |                  |
| email               | VARCHAR   | Unique, Required |
| password            | TEXT      | Hashed           |
| full_name           | VARCHAR   | Required         |
| gender              | CHAR(1)   | m / f / o        |
| mobile_no           | VARCHAR   | Optional, Unique |
| is_email_verified   | BOOLEAN   | Default: false   |
| created_at          | TIMESTAMP | Default: now()   |

### Company Table

| Column        | Type      | Notes                |
| ------------- | --------- | -------------------- |
| id            | SERIAL PK |                      |
| owner_id      | INT FK    | References users(id) |
| company_name  | TEXT      | Required             |
| address       | TEXT      | Required             |
| city          | VARCHAR   | Required             |
| state         | VARCHAR   | Required             |
| country       | VARCHAR   | Required             |
| postal_code   | VARCHAR   | Required             |
| website       | TEXT      | Optional             |
| industry      | TEXT      | Required             |
| founded_date  | DATE      | Optional             |
| description   | TEXT      | Optional             |
| social_links  | JSONB     | Optional             |
| created_at    | TIMESTAMP | Default: now()       |

---

## 📖 Usage Flow

1. **Register** → User account created and JWT issued.
2. **Login** → JWT saved in localStorage.
3. **Company Dashboard** →
   * User can create/update/delete their own company.
   * Other companies appear in read-only mode.
4. **Logout** → JWT cleared from localStorage.

---

## 📌 Notes

* Do not include `node_modules` in submission ZIP.
* Both frontend & backend must run with the provided `.env`.
* Video demo link is included in submission.
* Code follows proper indentation, validation & error handling.

---

## 👤 Author

* **Name**: Teja Gampasani
* **Role**: Bluestock Intern
