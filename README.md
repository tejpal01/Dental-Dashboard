# 🦷 Dental Center Management Dashboard

A fully responsive frontend-only React application to manage patients, appointments (incidents), and treatment records for a dental clinic. Built as part of the ENTNT frontend practical assignment.

---

## 🚀 Live Demo

🌐 [**Click here to view the deployed site**](https://686809bdc9dd773d14f9d6fb--dentaldashboard.netlify.app/)

---

## 👤 User Roles

### 🔐 1. Admin (Dentist)
- Access to full dashboard
- Can add/edit/delete patients
- Can manage appointments (incidents)
- Can upload files related to treatment
- Can view KPIs and calendar

### 👤 2. Patient
- Can log in and view only their own appointment/treatment history

---

## 🧪 Login Credentials

### ✅ Admin Login
Email: admin@entnt.in
Password: admin123

### ✅ Auto-Generated Patient Login

When Admin adds a new patient:
- A login user is created automatically.
- Format for Password: `firstname` + `birth year`

#### Example:
Patient Name: Tejas rajput
DOB: 2002-06-21
Email: tejas@gmail.com
password generated is : tejas2002  
the email and password toggle when admin adds the patient

Patient login gets saved to localStorage, and login details are shown in an alert after adding.

---

## ✨ Features

- 🔑 Role-based login (Admin & Patient)
- 🧑‍⚕️ Add/edit/delete patients
- 📅 Manage appointments (incidents) with dates, files, comments
- 📂 File uploads and preview support
- 📊 Admin dashboard with KPI cards
- 📆 Responsive calendar view with blue dot indicators on dates with appointments
- 🪟 Responsive modern UI
- 💾 LocalStorage-based persistent data
- 🧠 Form validations and feedback alerts

---

## 🛠 Tech Stack

- React (Functional Components + Hooks)
- React Router DOM
- Context API (Global State)
- UUID for unique IDs
- Custom Responsive CSS 
- LocalStorage (for backend simulation)

---

## 📁 Folder Structure

<pre> ``` src/ ├── components/ │ └── Navigation.js ├── contexts/ │ ├── AuthContext.js │ └── DataContext.js ├── pages/ │ ├── Dashboard.js │ ├── LoginPage.js │ ├── PatientsPage.js │ ├── IncidentsPage.js │ ├── CalendarPage.js │ └── PatientDashboard.js ├── styles/ │ └── global.css ├── App.js └── index.js ``` </pre>



---

## 💻 How to Run Locally

```bash
# 1. Clone the repository
git clone [https://github.com/tejpal01/Dental-Dashboard.git]
cd dental-dashboard

# 2. Install dependencies
npm install

# 3. Run the development server
npm start


🧑‍💻 Author
Built with ❤️ by Tejpal Rajput
As part of ENTNT Frontend Practical Task Submission

📨 Email: tejpalsrajput1747@gmail.com
