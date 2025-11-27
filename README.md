# Fullstack Ecommerce App

A fullstack ecommerce web application built with a **React + Vite** frontend and a **Python Flask** backend.
This project includes product browsing, cart functionality, checkout simulation, user authentication, and a structured admin/user flow.

The backend uses lightweight JSON files as a storage layer (Demo Mode), while the frontend uses React Context for state management and custom CSS for styling.

---

## 🚀 Features (High-Level)

### **Frontend (React + Vite)**
- Clean responsive UI with custom CSS (no Tailwind)
- Product grid, product detail page, and shop filters
- Cart drawer with quantity controls
- Checkout & confirmation flow
- User authentication (login/register)
- User dashboard with account overview
- Store locator and contact page
- Protected routes for user and admin areas
- Global state management using Context API
- Framer Motion animations

### **Backend (Flask)**
- User registration & login routing
- Product routes (GET all products, get product by ID)
- Store routes for store locator
- Orders route for creating/reading orders
- Contact form endpoint
- Admin-only routes (for future expansion)
- JSON file persistence for demo mode
- Input validation + unified response messages

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- Context API
- Custom CSS
- Framer Motion
- Fetch / REST API

### **Backend**
- Python 3.10+
- Flask
- Flask Blueprints
- JSON file storage
- Custom validators & file manager utilities
- Pytest (for backend tests)

---

## 📂 Project Structure

ecommerce_app/
├── backend/
│ ├── app.py
│ ├── init.py
│ ├── requirements.txt
│ ├── data/
│ │ ├── messages.json
│ │ ├── orders.json
│ │ ├── products.json
│ │ ├── stores.json
│ │ └── utils/
│ │ ├── init.py
│ │ ├── file_manager.py
│ │ └── validators.py
│ ├── models/
│ │ └── init.py
│ ├── routes/
│ │ ├── init.py
│ │ ├── admin_routes.py
│ │ ├── contact.py
│ │ ├── health.py
│ │ ├── orders.py
│ │ ├── products.py
│ │ ├── stores.py
│ │ └── user_routes.py
│ └── tests/
│ ├── test_validators.py
│ └── pycache/
│
├── frontend/
│ ├── public/
│ │ └── data/
│ │ └── stores.json
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── context/
│ │ ├── data/
│ │ ├── hooks/
│ │ ├── pages/
│ │ ├── utils/
│ │ ├── App.jsx
│ │ ├── App.css
│ │ ├── main.jsx
│ │ └── index.css
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ ├── postcss.config.cjs
│ └── .env (optional)
│
└── README.md


---

## ⚙️ Setup Instructions

### **1. Clone the Repository**
```bash
git clone https://github.com/RodriguezRamiro/ecommerce_app.git
cd ecommerce_app

🔧 Backend Setup (Flask)
Install Dependencies


Run the Backend
python app.py
By default, it runs on:
http://localhost:5000


🎨 Frontend Setup (React + Vite)
Install dependencies:
bash
Copy code

bash
cd frontend
npm install
npm run dev

Vite will print your local dev URL:

http://localhost:5173

The frontend expects the backend at http://localhost:5000 unless changed in src/config.js.


🧪 Testing

Run backend tests:

cd backend
pytest

📌 Notes

The project currently uses JSON files for storage (Demo Mode).

For a real production environment, replace JSON with:

PostgreSQL / MySQL / MongoDB

SQLAlchemy or an ORM

Authentication with JWT or Flask-Login

Styling uses custom CSS, no Tailwind or frameworks.

Admin routes exist and can be expanded later.

📈 Future Improvements

Full database integration

JWT authentication

Real payment processing (Stripe)

Admin product & order management

Global cart persistence (cookies or backend sync)

Image uploads for products

Responsive admin dashboard redesign

📄 License

This project is licensed under the MIT License . You can find the full text of the license in the LICENSE file.

👤 Author

Ramiro Rodriguez Alvarez

RodriguezTech Solutions
© 2026 RodriguezTech. All rights reserved.

🔗 GitHub: github.com/rodriguezramiro

🔗 LinkedIn: linkedin.com/in/ramiro-rodriguez-3a287a328

🌐 Portfolio: rodriguezcodesolutions.tech

“Great software is made with curiosity, clarity, and care.” – You, probably.
