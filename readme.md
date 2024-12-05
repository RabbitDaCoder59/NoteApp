# Note App Documentation

## Overview
This note app allows users to create, view, edit, and delete notes. Each note has a title, content, a random color, and a timestamp. Users can also upload profile images and manage their accounts. The application uses **React** for the frontend, **Node.js** with **Express** for the backend, **MySQL** as the database, and libraries like `yup` for form validation and `react-toastify` for notifications.

---

## Features
### General Features:
- **User Authentication:** Login and Signup functionalities.
- **Note Management:** Add, view, edit, and delete notes.
- **Random Note Color:** Notes are automatically assigned random colors.
- **Notifications:** Success and error notifications using `react-toastify`.

### Technologies Used:
- **Frontend:** React.js, Axios, React-Router, Toastify, React-icons
- **Backend:** Node.js, Express.js, Sequelize ORM, MySQL
- **Validation:** Yup with `react-hook-form`
- **Database:** MySQL with Sequelize
- **Styling:** Tailwind CSS (or relevant styles)

---

## File and Folder Structure
### Frontend
```
notapp/
├── node_modules/
├── public/
│   ├── index.html
├── src/
│   ├── assets/
│   │   ├── home.png
│   │   ├── logo.png
│   │   ├── not-found-image.png
│   │   └── no-profile.jpg
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── footer/
│   │   │   └── Footer.jsx
│   │   ├── header/
│   │   │   └── Navbar.jsx
│   │   ├── Card.jsx
│   │   ├── EditProfile.jsx
│   │   ├── EmptyNote.jsx
│   │   ├── FormErrMsg.jsx
│   │   └── PageNotFound.jsx
│   ├── context/
│   │   └── NotesContext.jsx
│   ├── helpers/
│   │   └── data.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Notes.jsx
│   │   ├── Note.jsx
│   │   ├── Profile.jsx
│   │   └── PageNotFound.jsx
│   ├── routes/
│   │   └── PrivateRoutes.jsx
│   ├── tests/
│   │   ├── components/
│   │   │   ├── EditProfile.test.jsx
│   │   │   ├── EmptyNote.test.jsx
│   │   │   ├── NoteCard.test.jsx
│   │   │   └── PageNotFound.test.jsx
│   │   ├── pages/
│   │   │   ├── NoteEditor.test.jsx
│   │   │   ├── Notes.test.jsx
│   │   │   └── Profile.test.jsx
│   └── utils/
│       ├── generateId.js
│       ├── RandomColor.js
│       └── utility.js
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── setupTests.js
└── README.md

```

### Backend
```
notapp_server/
├── config/
│   └── config.json
├── middlewares/
│   ├── AuthMiddleware.js
│   └── upload.js
├── models/
│   ├── index.js
│   ├── Notes.js
│   └── Users.js
├── routes/
│   ├── Notes.js
│   └── Users.js
├── uploads/
│   └── profileImage-[filename]
├── .gitignore
├── package-lock.json
├── package.json
├── server.js
└── .env

```

---

## Backend Overview
### Models

1. **Notes Model**
   - **Fields:**
     - `id`: UUID, primary key
     - `title`: Note title
     - `content`: Note content
     - `date`: Timestamp (default: current date)
     - `notecolor`: Randomly generated color
     - `userId`: Foreign key linking to the `Users` model
   - **Associations:**
     - Belongs to `Users` model

   ```javascript
   Notes.belongsTo(models.Users, {
       foreignKey: "userId",
       onDelete: "CASCADE",
   });
   ```

2. **Users Model**
   - **Fields:**
     - `username`: Username of the user
     - `password`: Encrypted password
     - `email`: Email address
     - `profileImage`: Optional profile image URL
   - **Associations:**
     - Has many `Notes`

   ```javascript
   Users.hasMany(models.Notes, {
       foreignKey: "userId",
       onDelete: "CASCADE",
   });
   ```

---

### API Endpoints

#### **Auth Routes**
1. **POST** `/auth/signup`: Register a new user.
2. **POST** `/auth/login`: Authenticate user and return a JWT token.

#### **Notes Routes**
1. **GET** `/notes`: Fetch all notes for the logged-in user.
2. **POST** `/notes`: Create a new note.
3. **PUT** `/notes/:id`: Edit an existing note.
4. **DELETE** `/notes/:id`: Delete a note.

---

## Frontend Overview

### Context API
`NotesContext` is used to manage state for notes throughout the application.

### Components
1. **Card.jsx**
   - Displays a grid of notes.
   - Clicking a note navigates to the note detail page.

2. **NoteEditor.jsx**
   - Allows users to add or edit notes.
   - Uses `react-toastify` for notifications on save.

3. **Login.jsx**
   - Handles user login using `react-hook-form` and `yup`.

---

## Sample Code Snippets

### Backend: Random Note Color Generation
```javascript
const getRandomColor = () => {
  const primaryColors = ["#1E90FF", "#FF4500"];
  const secondaryColors = ["#32CD32", "#FFD700"];
  const allColors = [...primaryColors, ...secondaryColors];
  return allColors[Math.floor(Math.random() * allColors.length)];
};
```

### Frontend: Note Card
```javascript
<div
  key={note.id}
  className="card"
  style={{ backgroundColor: note.notecolor }}
  onClick={() => navigate(`/notes/${note.id}`)}
>
  <h2>{note.title}</h2>
  <p>{note.content}</p>
</div>
```

---

## Environment Variables
Create a `.env` file in the backend directory:
```
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your_jwt_secret
```

---

## Running the Application

### Backend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Make sure the MySQL server is running.

### Frontend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

---

## Future Enhancements
1. Add user roles (e.g., admin).
2. Enable searching and filtering notes.
3. Integrate file uploads for attachments.
4. Implement a dark mode.

---
### code with love by
## RabbitDaCoder 