# Auth Dashboard App

A full-stack authentication and blog management application built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

## Features

- User Registration and Login
- JWT Authentication
- Secure Password Hashing
- Protected API Routes
- View and Update User Profile
- Create New Blogs
- View Personal Blogs
- Edit Blogs
- Delete Blogs
- User Logout

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
auth-dashboard-app/
├── client/
│   ├── css/
│   ├── js/
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
│   ├── profile.html
│   └── create-blog.html
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── package.json
└── README.md
```

## Installation and Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the backend server:

```bash
npm run dev
```

5. Open `client/login.html` using VS Code Live Server.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/users/profile` | Get profile |
| PUT | `/api/users/profile` | Update profile |
| POST | `/api/blogs` | Create blog |
| GET | `/api/blogs/my-blogs` | Get user blogs |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |

## Author

Full Stack Web Development Project