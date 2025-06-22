# 📋 Task Management System

A full-stack task management application built with **Angular** (frontend), **Spring Boot** (backend), and **PostgreSQL** (database). Users can register, log in, and manage their personal tasks securely.

## 🚀 Features

### 👤 User Authentication & Authorization
- User registration & login
- JWT-based authentication (backend ready)
- Secure password storage with BCrypt

### ✅ Task Management
- Create, read, update, and delete tasks
- Set priority levels and due dates
- Manage task status: `TODO`, `IN_PROGRESS`, `COMPLETED`

### 📊 Dashboard
- Task overview per user
- Filter by status, priority, or date
- Fully responsive UI with Angular Material

---

## 🛠 Tech Stack

### 🔹 Frontend
- **Angular** (TypeScript)
- **Angular Material** – UI components
- **RxJS / HttpClient** – Reactive requests
- **CSS3** – Styling

### 🔸 Backend
- **Spring Boot**
- **Spring Data JPA** & **Spring Web**
- **Maven** – Dependency management

### 🗄 Database
- **PostgreSQL**

### 🔐 Security
- CORS configuration for Angular integration
- (Optional) JWT support for authentication

---

## 📋 Prerequisites

Install the following to run the project locally:

- Node.js (v14+)
- npm
- Angular CLI (`npm install -g @angular/cli`)
- Java JDK 11+
- Maven 3.6+
- PostgreSQL 12+

---

## ⚙️ Installation & Setup

### 🌐 Live Demo

Deployed on **Render**:

- 🔗 Frontend: [https://task-manager-system-7.onrender.com](https://task-manager-system-7.onrender.com)
- 🔗 Backend: [https://task-manager-system-3l2x.onrender.com](https://task-manager-system-3l2x.onrender.com)

---

### 🏠 Local Development

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system


### 2. Database Setup

Create a PostgreSQL database:

sql
CREATE DATABASE task_management_db;


### 3. Backend Setup

Navigate to the backend directory:

bash
cd backend


Update application.properties or application.yml:

properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:4200/task_management_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect



Install dependencies and run:

bash
mvn clean install
mvn spring-boot:run


The backend will start on http://localhost:8081

### 4. Frontend Setup

Navigate to the frontend directory:

bash
cd frontend1


Install dependencies:

bash
npm install



Start the development server:

`bash
ng serve


The frontend will start on `http://localhost:4200`

## 🔧 API Endpoints

### Authentication
- `POST /user/newuser` - User registration
- `POST /user/loginuser` - User login

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task


## 🗄 Database Schema

### Users Table
sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
);
`

### Tasks Table

sql
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'TODO',
    due_date TIMESTAMP,
    user_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


## 🔐 Security Features

- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Request Validation**: Input validation and sanitization

## 🧪 Testing

### Backend Testing

bash
cd backend
mvn test


### Frontend Testing

bash
cd frontend
ng test



## 📱 Usage

1. **Register** a new account or **login** with existing credentials
2. **Create tasks** with title, description, status, and due date
3. **Update task status** as you progress (Todo → In Progress → Completed)
4. **Filter and sort** tasks based on various criteria
5. **Delete** completed or unnecessary tasks

## 🚀 Deployment

This application is deployed on **Render** with the following setup:

### Live Application

- **Frontend**: https://task-manager-system-7.onrender.com
- **Backend**: https://task-manager-system-3l2x.onrender.com

### Render Deployment Configuration

#### Backend (Spring Boot)

1. **Build Command**: `mvn clean package -DskipTests`
2. **Start Command**: `java -jar target/task-management-*.jar`
3. **Environment Variables**:
   
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=86400000
   SPRING_PROFILES_ACTIVE=prod
   

#### Frontend (Angular)

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist/projectname/browser`
3. **Environment Variables**:

   

   

#### Database

- **PostgreSQL**: Deployed as a managed database service on Render
- Connection string automatically provided via `DATABASE_URL` environment variable

### Production Configuration

Update your `application-prod.properties`:

properties
# Database Configuration (uses DATABASE_URL from Render)
spring.datasource.url=${DATABASE_URL}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false


# CORS Configuration for production
cors.allowed-origins=https://your-frontend-url.onrender.com
```

### Deployment Steps

1. *Connect Repository*: Link your GitHub repository to Render
2. *Configure Services*: Set up separate services for frontend, backend, and database
3. *Environment Variables*: Configure all required environment variables
4. *Auto-Deploy*: Enable automatic deployments on git push
5. *Custom Domain* (Optional): Configure custom domain if needed

---

*Happy Task Managing! 📋✅*
