# Portfolio Project

## Overview

The Portfolio Project is a full-stack web application designed for web developers to showcase their skills, projects, and professional achievements. The application is structured with a Flask backend that provides RESTful APIs and a React frontend for a dynamic user experience.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Features

- Admin user authentication with secure password storage.
- CRUD operations for projects and skills and posts.
- Dynamic project listings with detailed descriptions and links.
- User-friendly interface built with React for a responsive experience.
- Ability to manage projects, skills, and posts dynamically from the admin dashboard.

## Technologies

- **Backend**: Framework (Flask), ORM (Sqlalchemy)
- **Frontend**: library (React)
- **Database**: MySQL
- **Environment**: Python 3.x and Node.js for the React app
- **Authentication**: JSON Web Tokens (JWT) for secure API access

## Project Structure
```
portfolio/
│
├── backend/
│   ├── src/
│   │   ├── __init__.py             # Initializing the main package
│   │   ├── config.py               # Configuration settings
│   │   ├── models.py               # Database models
│   │   ├── requirements.txt        # Dependencies
│   │   ├── routes/                 # API routes
│   │   │   ├── __init__.py         # Blueprints are imported here
│   │   │   ├── auth.py             # Authentication routes
│   │   │   ├── projects.py         # Project management routes
│   │   │   ├── skills.py           # Skills management routes
│   │   │   └── posts.py            # Posts management routes
│   │   └── migrations/             # Database migration files
│   └── run.py                      # Entry point for development purposes
│
├── frontend/
│   ├── src/                        # React source files
│   │   ├── assets/                 # Folder for images, logos, and other assets
│   │   │   ├── images/             # Images
│   │   │   ├── logos/              # Logos
│   │   │   └── styles/             # Additional styles
│   │   ├── components/             # Reusable components
│   │   ├── pages/                  # Page components for routing
│   │   ├── App.js                  # Main app component
│   │   ├── index.js                # Entry point for the React
│   │   └── apiService.js           # API service for handling HTTP requests
│   ├── public/                     # Static files for React
│   └── package.json                # Node.js dependencies
│
└── README.md                       # Project documentation
```

# To be completed

