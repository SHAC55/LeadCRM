# Lead CRM

A full-stack Lead Management CRM built with the MERN stack. The application allows users to authenticate securely, manage leads, track lead statuses, and view lead analytics through an intuitive dashboard.

## Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication
* Access Token & Refresh Token System
* Protected Routes
* Secure HTTP-only Cookies

### Lead Management

* Create Lead
* View All Leads
* Update Lead
* Delete Lead
* Lead Details
* User-specific Leads

### Lead Tracking

* New
* Contacted
* Qualified
* Converted
* Lost

### Dashboard

* Total Leads
* New Leads Count
* Qualified Leads Count
* Converted Leads Count
* Lead Analytics

### Search & Filtering

* Search by Name
* Search by Email
* Search by Company
* Status Filtering

## Tech Stack

### Frontend

* React.js
* React Router DOM
* React Hook Form
* Axios
* Tailwind CSS
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Cookie Parser

## Project Structure

```bash
client/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── LeadTable.jsx
│   │   ├── LeadModal.jsx
│   │   ├── StatsCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── LeadContext.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   └── App.jsx
│
server/
│
├── controller/
│   ├── auth.controller.js
│   └── lead.controller.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── userModel.js
│   └── leadModel.js
│
├── routes/
│   ├── auth.route.js
│   └── lead.route.js
│
├── utils/
│   └── generateToken.js
│
├── app.js
└── server.js
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

CLIENT_URL=http://localhost:5173
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## API Endpoints

### Auth Routes

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
GET  /api/auth/me
```

### Lead Routes

http
POST   /api/leads
GET    /api/leads
GET    /api/leads/:id
PUT    /api/leads/:id
DELETE /api/leads/:id
GET    /api/leads/stats


## Security Features

* Password Hashing using bcryptjs
* JWT Authentication
* Protected APIs
* HTTP-only Refresh Token Cookies
* User-specific Lead Access
* Authorization Middleware

## Future Enhancements

* Role Based Access Control (RBAC)
* Team Collaboration
* Email Notifications
* Lead Import/Export
* Advanced Analytics
* Activity Logs
* Dark Mode

## Author

Saif Chaudhary

Built as a Full Stack MERN Lead CRM project.
