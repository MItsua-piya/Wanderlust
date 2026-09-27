# Wanderlust 🌍

A full-stack home rental platform inspired by Airbnb, built with Node.js, Express.js, MongoDB, Mongoose, and EJS. The application allows users to create, view, edit, and delete property listings with authentication, reviews, image uploads, and interactive maps.

**Live Demo:** [https://voyago-travel-6lqd.onrender.com/listings](https://voyago-travel-6lqd.onrender.com/listings)

**GitHub:** [https://github.com/MItsua-piya/Wanderlust](https://github.com/MItsua-piya/Wanderlust)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | EJS (Server-side templating), HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | Passport.js with local strategy + sessions |
| Image Storage | Cloudinary |
| Maps | Mapbox/Leaflet.js |
| Deployment | Render (backend) + MongoDB Atlas (database) |
| Version Control | Git & GitHub |

---

## ✨ Features Implemented

### Core Listing Management (CRUD)
- Create new property listings with images, prices, location, and description
- View all listings with grid layout and responsive design
- View individual listing details with full information
- Edit existing listings (owner only)
- Delete listings (owner only)
- Image upload and storage via Cloudinary

### User Authentication & Authorization
- User registration and login with Passport.js local strategy
- Session-based authentication with express-session
- Password hashing with bcryptjs
- JWT-style authorization checks (owner-only edit/delete)
- Login persistence across sessions
- Secure logout functionality

### Reviews & Ratings
- Post reviews and ratings on listings
- View all reviews for a listing
- Delete reviews (review author only)
- Star rating system
- Review author authentication

### Interactive Maps
- Mapbox/Leaflet.js integration on listing detail pages
- Display property location on interactive map
- Zoom and pan functionality

### User Experience
- Flash messaging for all actions (success/error feedback)
- Responsive design for desktop and mobile
- Search and filter by location
- Listing cards with image gallery
- Clean, intuitive navigation

### Code Quality
- MVC architecture for scalability
- Custom error-handling middleware
- Joi validation for server-side and client-side validation
- RESTful API design with proper HTTP methods and status codes
- Clean, modular code with comments

---

## 📁 Project Structure

```
Wanderlust/
│
├── app.js                          # Main application entry point
├── package.json
├── .env                            # Environment variables (not in repo)
├── .gitignore
│
├── models/
│   ├── user.js                     # User schema with Passport integration
│   ├── listing.js                  # Listing schema with validation
│   └── review.js                   # Review schema
│
├── routes/
│   ├── listings.js                 # CRUD routes for listings
│   ├── reviews.js                  # Review routes
│   └── auth.js                     # Authentication routes (register/login)
│
├── middleware/
│   ├── auth.js                     # Authentication middleware
│   ├── validation.js               # Joi schema validation
│   └── error.js                    # Error handling middleware
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs        # Main layout template
│   ├── partials/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs               # Flash message component
│   │
│   ├── listings/
│   │   ├── index.ejs               # All listings view
│   │   ├── new.ejs                 # Create listing form
│   │   ├── show.ejs                # Individual listing detail
│   │   └── edit.ejs                # Edit listing form
│   │
│   └── auth/
│       ├── register.ejs
│       └── login.ejs
│
└── public/
    ├── css/
    │   └── style.css               # Custom styles
    └── js/
        └── script.js               # Client-side validation
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)
- Mapbox account (free tier available)
- Render account for deployment (free tier available)

### Local Development

**1. Clone the repository:**
```bash
git clone https://github.com/MItsua-piya/Wanderlust.git
cd Wanderlust
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file:**
```
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
PORT=8080
```

**4. Run the development server:**
```bash
npm start
```
or with nodemon for auto-reload:
```bash
npx nodemon app.js
```

**5. Open in browser:**
```
http://localhost:8080/listings
```

---

## 📊 API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | Show create listing form |
| POST | `/listings` | Create new listing |
| GET | `/listings/:id` | View listing details |
| GET | `/listings/:id/edit` | Show edit form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |
| POST | `/listings/:id/reviews` | Add review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review |
| POST | `/register` | User registration |
| POST | `/login` | User login |
| GET | `/logout` | User logout |

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed)
}
```

### Listing Schema
```javascript
{
  title: String,
  description: String,
  price: Number,
  location: String,
  country: String,
  image: String (Cloudinary URL),
  geometry: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  owner: ObjectId (User reference),
  reviews: [ObjectId] (Review references),
  createdAt: Date
}
```

### Review Schema
```javascript
{
  comment: String,
  rating: Number (1-5),
  author: ObjectId (User reference),
  listing: ObjectId (Listing reference),
  createdAt: Date
}
```

---

## 🚀 Deployment

The application is deployed on **Render** with **MongoDB Atlas** for the database.

### Deployment Steps:

1. **MongoDB Atlas Setup:**
   - Create free M0 cluster at mongodb.com/atlas
   - Get connection string
   - Add IP whitelist (0.0.0.0/0 for Render)

2. **Render Deployment:**
   - Connect GitHub repo
   - Add environment variables from `.env`
   - Set build command: `npm install`
   - Set start command: `node app.js`
   - Deploy

3. **Live URL:** [https://voyago-travel-6lqd.onrender.com](https://voyago-travel-6lqd.onrender.com)

**Note:** Render free tier spins down after 15 minutes of inactivity. First load after sleep takes 30-60 seconds.

---

## 🔐 Security Features

- Password hashing with bcryptjs
- Session-based authentication
- CSRF protection (can be added with csurf)
- Input validation with Joi
- Authorization checks for owner-only operations
- Secure environment variable handling
- MongoDB injection prevention via Mongoose

---

## 📚 Learning Outcomes

Through building Wanderlust, you'll learn:
- Full-stack MERN-adjacent development with EJS
- User authentication and authorization patterns
- RESTful API design and routing
- MongoDB schema design and relationships
- Image upload and cloud storage integration
- Maps integration in web applications
- MVC architecture and code organization
- Deployment to production environments
- Git version control and GitHub workflow

---

## 🔮 Future Enhancements

- [ ] Advanced search and filtering (price range, ratings, amenities)
- [ ] Booking system with date availability
- [ ] Payment integration (Stripe/Razorpay)
- [ ] User profile pages and dashboard
- [ ] Email notifications for reviews
- [ ] Admin dashboard for moderation
- [ ] Social features (favorites, follow users)
- [ ] Rating and recommendation algorithm
- [ ] API rate limiting and security headers
- [ ] Mobile app version

---

## 🤝 Contributing

This is a personal learning project. However, feel free to fork and modify!

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👩‍💻 Author

**Priya Wankhade**
- GitHub: [@MItsua-piya](https://github.com/MItsua-piya)
- LinkedIn: [priya-wankhade](https://linkedin.com/in/priya-wankhade-338a67331)
- Email: priyawankhade0314@gmail.com

---

## 🎯 Key Takeaway

Wanderlust demonstrates full-stack web development from concept to production deployment. It showcases real engineering practices including authentication, authorization, cloud storage, third-party integrations, and production deployment — exactly what companies like Google, Microsoft, and Stripe look for in engineering interns.
