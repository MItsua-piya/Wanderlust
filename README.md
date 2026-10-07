# Wanderlust 🌍

A full-stack home rental platform inspired by Airbnb, built with Node.js, Express.js, MongoDB, and deployed with Docker and automated CI/CD. The application allows users to create, view, edit, and delete property listings with authentication, reviews, image uploads, and interactive maps.

**Live Demo:** [https://voyago-travel-6lqd.onrender.com/listings](https://voyago-travel-6lqd.onrender.com/listings)

**GitHub:** [https://github.com/MItsua-piya/Wanderlust](https://github.com/MItsua-piya/Wanderlust)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | EJS, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | Passport.js with local strategy |
| Image Storage | Cloudinary |
| Maps | Mapbox/Leaflet.js |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Deployment | Render (backend) + MongoDB Atlas |
| Version Control | Git & GitHub |

---

## ✨ Features Implemented

### Core Listing Management (CRUD)
- Create, read, update, delete property listings with images
- Image upload and storage via Cloudinary
- Responsive grid layout with listing cards

### User Authentication & Authorization
- User registration and login with Passport.js
- Session-based authentication with bcryptjs password hashing
- Owner-only edit/delete authorization checks
- Secure logout functionality

### Reviews & Ratings
- Post reviews and ratings on listings
- Star rating system (1-5 stars)
- Delete reviews (author only)

### Interactive Maps
- Mapbox/Leaflet.js integration
- View property locations on interactive map
- Zoom and pan functionality

### DevOps & Deployment
- **Docker containerization** for consistent dev/prod environments
- **Docker Compose** for local development with multi-container setup
- **GitHub Actions CI/CD pipeline** for automated testing, building, and deployment
- Automated deployment to Render on every push to main branch
- Environment-based configuration management

### Code Quality
- MVC architecture for scalability
- Joi validation (server + client-side)
- Custom error-handling middleware
- RESTful API design with proper HTTP methods
- Clean, modular code structure

---

## 📁 Project Structure

```
Wanderlust/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD pipeline
│
├── models/
│   ├── user.js
│   ├── listing.js
│   └── review.js
│
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── auth.js
│
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── error.js
│
├── views/
│   ├── layouts/boilerplate.ejs
│   ├── partials/
│   └── listings/
│       ├── index.ejs
│       ├── new.ejs
│       ├── show.ejs
│       └── edit.ejs
│
├── public/css/
│   └── style.css
│
├── Dockerfile                      # Docker container configuration
├── docker-compose.yml              # Multi-container setup
├── .dockerignore                   # Docker build optimization
├── app.js
├── package.json
├── .env.example
├── README.md
└── .gitignore
```

---

## 🐳 Docker Setup

### Dockerfile
The application is containerized using a multi-stage build for optimized production images:

```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --production

FROM node:18-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base AS production
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]
```

### Docker Compose
Local development with Docker Compose:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/wanderlust
    depends_on:
      - mongo
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

**Run locally with Docker:**
```bash
docker-compose up
```

---

## 🔄 GitHub Actions CI/CD Pipeline

Automated deployment workflow on every push to main:

```yaml
name: Deploy to Render
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl ${{ secrets.RENDER_DEPLOY_HOOK }}
```

**What the pipeline does:**
1. Triggers on every push to main branch
2. Runs automated tests (if configured)
3. Builds Docker image
4. Pushes to container registry
5. Deploys to Render automatically
6. No manual deployment needed

**Benefits:**
- ✅ Faster, error-free deployments
- ✅ Consistent dev/prod environments
- ✅ Rollback capability
- ✅ Deployment history tracking

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose (for containerized development)
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Local Development (Without Docker)

**1. Clone repository:**
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
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
PORT=8080
```

**4. Run development server:**
```bash
npm start
# or with auto-reload
npx nodemon app.js
```

**5. Open browser:**
```
http://localhost:8080/listings
```

### Local Development (With Docker)

**1. Build and run with Docker Compose:**
```bash
docker-compose up
```

**2. Open browser:**
```
http://localhost:8080/listings
```

**Benefits of Docker development:**
- Identical to production environment
- No "works on my machine" issues
- Easy to share setup with team members
- Includes MongoDB container locally

---

## 📊 API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/listings` | View all listings |
| POST | `/listings` | Create listing |
| GET | `/listings/:id` | View listing details |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |
| POST | `/listings/:id/reviews` | Add review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review |
| POST | `/register` | User registration |
| POST | `/login` | User login |
| GET | `/logout` | User logout |

---

## 🗄️ Database Schema

### Listing Model
```javascript
{
  title: String,
  description: String,
  price: Number,
  location: String,
  country: String,
  image: String (Cloudinary URL),
  geometry: { type: "Point", coordinates: [lng, lat] },
  owner: ObjectId (User reference),
  reviews: [ObjectId] (Review references),
  createdAt: Date
}
```

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed with bcryptjs)
}
```

### Review Model
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

## 🚀 Production Deployment

### On Render

1. **Connect GitHub repo** to Render
2. **Set environment variables** in Render dashboard
3. **Configure deployment:**
   - Build command: `npm install`
   - Start command: `node app.js`
4. **Auto-deploy** on every push to main via GitHub Actions

**Note:** Render free tier spins down after 15 min inactivity (30-60 sec cold start).

---

## 🔐 Security Features

- Password hashing with bcryptjs
- Session-based authentication
- CSRF protection through secure sessions
- Input validation with Joi
- Authorization checks (owner-only operations)
- Environment variable management for secrets
- MongoDB injection prevention via Mongoose

---

## 📚 Learning Outcomes

Building Wanderlust taught me:
- Full-stack MERN-adjacent development with EJS
- User authentication and authorization patterns
- RESTful API design
- MongoDB schema design
- Third-party integrations (Cloudinary, Mapbox)
- **Docker containerization for consistent environments**
- **CI/CD automation with GitHub Actions**
- MVC architecture and code organization
- Production deployment practices

---

## 🔮 Future Enhancements

- [ ] Advanced search and filtering
- [ ] Booking system with date availability
- [ ] Payment integration (Stripe)
- [ ] User profiles and dashboard
- [ ] Email notifications
- [ ] Admin moderation panel
- [ ] Social features (favorites, follow users)
- [ ] Kubernetes orchestration for scalability
- [ ] Comprehensive test coverage (Jest, Cypress)
- [ ] API rate limiting and security headers

---

## 🤝 Contributing

This is a personal learning project. Fork and modify as needed!

---

## 📄 License

Open source — learning and development purposes.

---

## 👩‍💻 Author

**Priya Wankhade**
- GitHub: [@MItsua-piya](https://github.com/MItsua-piya)
- LinkedIn: [priya-wankhade](https://linkedin.com/in/priya-wankhade-338a67331)
- Email: priyawankhade0314@gmail.com

---

## 🎯 Key Takeaway

Wanderlust demonstrates production-grade full-stack development from concept to containerized deployment with automated CI/CD. It showcases real engineering practices including authentication, authorization, cloud storage, third-party integrations, Docker containerization, and automated deployment pipelines — exactly what companies like Google, Microsoft, and Stripe expect from SWE interns.
