# Wanderlust 

Wanderlust is a full-stack web application for creating and viewing travel listings.  
The project is being built using Node.js, Express, MongoDB, Mongoose, and EJS.

The current version focuses on the basic CRUD foundation, including connecting the application to MongoDB, displaying listings, viewing individual listings, and creating new listings.

---

## Tech Stack

- Node.js- JavaScript runtime
- Express.js- Backend web framework
- MongoDB- Database
- Mongoose - MongoDB object modeling
- EJS - Server-side templating engine
- HTML & CSS - Frontend
- Nodemon - Development server auto-restart

---

##  Features Implemented

### Database Connection
- Connected Express application to MongoDB using Mongoose.
- Database used:

```text
wanderlust
Listings

##Currently implemented:

View all listings
View a single listing
Create a new listing
Store listings in MongoDB
Render pages using EJS
Current Routes
Method	Route	Purpose
GET	/	Home page
GET	/listings	Display all listings
GET	/listings/new	Display create-listing form
POST	/listings	Create and save a new listing
GET	/listings/:id	Display a single listimg

---
📁 Project Structure
Wanderlust/
│
├── app.js
├── package.json
├── package-lock.json
│
├── models/
│   └── listing.js
│
├── views/
│   └── listings/
│       ├── index.ejs
│       ├── new.ejs
│       └── show.ejs
│
└── node_modules/

---
🗄️ Listing Model

Each listing currently contains:

title
description
image
price
location
country

Example:

{
    title: "My New Villa",
    description: "By the beach",
    image: "image-url",
    price: 1200,
    location: "Calangute, Goa",
    country: "India"
}

---

⚙️ Installation

Clone the repository:

git clone <your-github-repository-url>

Move into the project:

cd Wanderlust

Install dependencies:

npm install
---

🗄️ MongoDB Setup

The application currently connects to a local MongoDB database:

mongodb://127.0.0.1:27017/wanderlust

Make sure MongoDB is running before starting the application.

▶️ Running the Application

Start the development server with:

nodemon app.js

Or, if Nodemon is configured in package.json:

npm run dev

The application runs on:

http://localhost:8080
📝 Creating a Listing

Navigate to:

http://localhost:8080/listings/new

Fill in the listing details and submit the form.

The form sends a POST request to:

POST /listings

The listing is then saved to MongoDB and the application redirects to:

/listings

----



🔄 Current Application Flow
Browser
   │
   ▼
Express.js
   │
   ├── GET /listings
   │       │
   │       ▼
   │    Mongoose
   │       │
   │       ▼
   │    MongoDB
   │       │
   │       ▼
   │    EJS View
   │
   └── POST /listings
           │
           ▼
       req.body
           │
           ▼
       Mongoose
           │
           ▼
       MongoDB
🛠️ Development
------
Nodemon is used during development so that the server automatically restarts whenever files are changed.

nodemon app.js
-----
📌 Future Improvements

Planned features include:

 Edit listings
 Delete listings
 Add proper styling
 Add navigation bar
 Add responsive design
 Add validation
 Add error handling
 Add user authentication
 Add reviews
 Add booking functionality
 Deploy the application

-----
👨‍💻 Author

Priya Wankhade
------


📄 License

This project is currently for learning and development purposes.
----