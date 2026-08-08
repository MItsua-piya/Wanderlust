# Wanderlust 🌍

A full-stack home rental platform inspired by Airbnb, built with Node.js, Express.js, MongoDB, Mongoose, and EJS. The application allows users to create, view, edit, and delete property listings, demonstrating complete RESTful routing, database integration, and server-side rendering.

---

## 🚀 Live Demo

> Deployment in progress — coming soon on Render + MongoDB Atlas

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Templating | EJS |
| Styling | HTML5 + CSS3 |
| Dev Tools | Nodemon |

---

## ✅ Features Implemented

### Core CRUD
- View all listings
- View a single listing in detail
- Create a new listing
- Edit an existing listing
- Delete a listing

### Database
- Connected Express application to MongoDB using Mongoose
- Persistent storage of all listing data

### Routing
- Full RESTful route structure following REST conventions
- Server-side rendering with EJS templates

---

## 📌 Current Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | / | Home page |
| GET | /listings | Display all listings |
| GET | /listings/new | Display create listing form |
| POST | /listings | Create and save new listing |
| GET | /listings/:id | Display single listing |
| GET | /listings/:id/edit | Display edit listing form |
| PUT | /listings/:id | Update existing listing |
| DELETE | /listings/:id | Delete a listing |

---

## 🗄️ Listing Schema

```javascript
{
  title: String,        // required
  description: String,  // required
  image: String,        // URL
  price: Number,        // per night
  location: String,     // city/area
  country: String       // country
}
```

---

## 📁 Project Structure

```
Wanderlust/
│
├── app.js                  # Main application entry point
├── package.json
├── package-lock.json
├── .gitignore
│
├── models/
│   └── listing.js          # Mongoose listing schema
│
├── views/
│   └── listings/
│       ├── index.ejs       # All listings
│       ├── new.ejs         # Create listing form
│       ├── show.ejs        # Single listing view
│       └── edit.ejs        # Edit listing form
│
└── public/
    └── css/
        └── style.css       # Custom styles
```

---

## ⚙️ Installation

**Clone the repository:**
```bash
git clone https://github.com/MItsua-piya/Wanderlust.git
cd Wanderlust
```

**Install dependencies:**
```bash
npm install
```

**Start MongoDB locally:**
```bash
mongod
```

**Run the development server:**
```bash
nodemon app.js
```

**Open in browser:**
```
http://localhost:8080
```

---

## 🔄 Application Flow

```
Browser
   │
   ▼
Express.js Router
   │
   ├── GET  /listings     → Fetch all → Mongoose → MongoDB → EJS render
   ├── POST /listings     → req.body  → Mongoose → MongoDB → redirect
   ├── PUT  /listings/:id → req.body  → Mongoose → MongoDB → redirect
   └── DELETE /listings/:id           → Mongoose → MongoDB → redirect
```

---

## 🔮 Upcoming Features

- [ ] Input validation with Joi
- [ ] Error handling middleware
- [ ] MongoDB Atlas migration
- [ ] User authentication (Passport.js + JWT)
- [ ] Session management
- [ ] Reviews and ratings system
- [ ] Search and filter by location/price
- [ ] Image upload with Cloudinary
- [ ] Map integration with Leaflet.js
- [ ] Booking system with date availability
- [ ] Full deployment on Render

---

## 👩‍💻 Author

**Priya Wankhade**
- GitHub: [@MItsua-piya](https://github.com/MItsua-piya)
- LinkedIn: [priya-wankhade](https://linkedin.com/in/priya-wankhade-338a67331)
- Email: priyawankhade0314@gmail.com

---

## 📄 License

This project is for learning and development purposes.
