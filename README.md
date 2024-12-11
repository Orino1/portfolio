# Portfolio Project

## Overview

The Portfolio Project is a full-stack web application designed for web developers to showcase their skills, projects, and professional achievements. The application is structured with a Flask backend that provides RESTful APIs and a React frontend for a dynamic user experience.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Features

- Admin user authentication with secure password storage.
- CRUD operations for projects and skills.
- Dynamic project listings with detailed descriptions and links.
- User-friendly interface built with React for a responsive experience.
- Ability to manage projects, skills dynamically from the admin dashboard.

## Technologies

- **Backend**: Framework (Flask), ORM (Sqlalchemy), libraries (Flask-eco-system, Marshmallow, Gunicorn)
- **Frontend**: libraries (React, Axios)
- **Database**: MySQL
- **Environment**: Python 3.x and Node.js for the React app
- **Authentication**: JWT as http-only cookies for secure API access

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
│   │   └── routes/                 # API routes
│   │       ├── __init__.py         # Blueprints are imported here
│   │       ├── auth.py             # Authentication routes
│   │       ├── projects.py         # Project management routes
│   │       └── skills.py           # Skills management routes
│   │
│   ├── migrations/                 # Database migration files
│   ├── requirements.txt            # dependencies files
│   ├── example.env                 # examples of environment variables
│   ├── create_admin.py             # Script for initializing the admin account
│   ├── run.py                      # Entry point for staging env
│   └── app.py                      # Entry point for production env
│
├── frontend/
│   ├── example.env                 # examples of environment variables
│   └── src/                        # React source files
│       ├── assets/                 # Folder for images, logos, and other assets
│       │   ├── images/             # Images
│       │   ├── logos/              # Logos
│       │   └── styles/             # Additional styles
│       ├── components/             # Reusable components
│       ├── contexts/               # contexts folder
│       ├── pages/                  # Page components for routing
│       ├── App.js                  # Main app component
│       └── apiService.js           # API service for handling HTTP requests
│
└── README.md                       # Project documentation
```

## API Endpoints

### Authentication Routes

#### **POST /login**

Logs in an admin user and returns access and refresh tokens.

- **Request Body**:
    ```json
    {
        "username": "admin_username",
        "password": "admin_password"
    }
    ```

- **Response**:
    - `200 OK`: Successful login and token returned.
    - `400 Bad Request`: Invalid input or admin not found.
    - `500 Internal Server Error`: Database or other unexpected errors.

- **Example**:
    ```json
    {
        "msg": "Login successful."
    }
    ```

#### **GET /refresh**

Refreshes the access token for an authenticated user.

- **Authorization**: Requires a valid refresh token.
  
- **Response**:
    - `200 OK`: Successful token refresh.
    - `500 Internal Server Error`: Unexpected errors.

- **Example**:
    ```json
    {
        "msg": "Access token refreshed successfully."
    }
    ```

#### **PATCH /password**

Changes the password for the authenticated admin user.

- **Authorization**: Requires valid access token.
  
- **Request Body**:
    ```json
    {
        "password": "new_password"
    }
    ```

- **Response**:
    - `200 OK`: Successful password update.
    - `400 Bad Request`: Invalid input.
    - `500 Internal Server Error`: Database errors.

- **Example**:
    ```json
    {
        "msg": "password changed successfully"
    }
    ```

#### **GET /status**

Checks if the admin is authenticated and the server is operational.

- **Authorization**: Requires valid access token.

- **Response**:
    - `200 OK`: Authentication status is `True`.
  
- **Example**:
    ```json
    {
        "success": true
    }
    ```
### Skills Routes

soon

### Projects Routes

soon

## Usage

1. **Clone the Repository:**
    ```
    git clone https://github.com/Orino1/portfolio.git
    ```
   
2. **Set Up the Backend:**
    - Navigate to the `backend/` folder:
    ```
    cd portfolio/backend
    ```
    - Create a venv for python:
    ```
    python -m venv myvenv
    source myenv/bin/activate
    ```
    - Install the required Python dependencies using pip:
    ```
    pip install -r requirements.txt
    ```
    - Configure the environment variables by copying the example.env file to .env and modifying the values as needed:
    ```
    cp example.env .env
    source .env
    ```
    - Run the migrations to set up the database:
    ```
    flask db upgrade
    ```
    - Initiate the admin account ( username/password: root/root feel free to change them from create_admin.py ):
    ```
    python3 create_admin.py
    ```
    - Start the Flask server:
    ```
    flask run
    ```
    - The backend should now be running on http://localhost:5000.

3. **Set Up the Frontend:**
    - Navigate to the `frontend/` folder:
    ```
    cd ../frontend
    ```
    - Install the required Node.js dependencies:
    ```
    npm install
    ```
    - Configure the environment variables by copying the example.env file to .env and modifying the values as needed:
    ```
    cp example.env .env
    ```
    - Start the React development server:
    ```
    npm start
    ```
    - The frontend should now be running on http://localhost:3000

### Deployment ( using nginx )

1. **Building and deploying the Frontend:**
    - Navigate to the `frontend/` folder:
    ```
    cd portfolio/frontend
    ```
    - Build the React application for production:
    ```
    npm run build
    ```
    - Copy the `build/` folder to your sites directory such as:
    ```
    cp -r build /var/www/your-site-name
    ```
    - Configuring nginx to serv the frontend:
    ```
    server {
        location / {
			root /var/www/your-site-name;
			index index.html;

			try_files $uri /index.html;
		}

		location ~* \.(js|css|svg|png|jpg|jpeg|gif|ico|woff2|ttf)$ {
			 root /var/www/your-site-name;
		}
    }
    ```
    - Restart `nginx` to apply the changes:
    ```
    sudo systemctl restart nginx
    ```
2. **Deploying the Frontend:**
    - Start application using Gunicorn:
    ```
    gunicorn -b localhost:8000 app:app
    ```
    - Configuring nginx to act as a reverse proxy for our flask appllication:
    ```
    server {
        location /api/ {
			proxy_pass http://localhost:8000;
			proxy_set_header Host $host;
		}
    }
    ```

### Congratulations ;)
