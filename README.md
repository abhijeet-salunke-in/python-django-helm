# Python Django Helm-Based Kubernetes Deployment

A containerized Python Django 3-tier Student Management System designed to demonstrate Docker containerization, Helm-based Kubernetes deployment, and CI/CD workflow using Jenkins.

## Project Overview

This project demonstrates how a multi-tier Django application can be containerized using Docker and deployed to Kubernetes using Helm.

The application consists of three main layers:

- **Frontend:** HTML, CSS, JavaScript served through Nginx
- **Backend:** Django REST Framework API
- **Database:** PostgreSQL

Instead of managing multiple Kubernetes YAML configurations directly, this project uses a Helm Chart to package and manage the Kubernetes resources.

## Architecture

```text
                         User
                           |
                           v
                  +----------------+
                  |     Nginx      |
                  |    Frontend    |
                  +----------------+
                           |
                           | API Requests
                           v
                  +----------------+
                  |     Django     |
                  |    REST API    |
                  +----------------+
                           |
                           v
                  +----------------+
                  |   PostgreSQL   |
                  |    Database    |
                  +----------------+

---

## DevOps Architecture

```text
Developer
    |
    v
  GitHub
    |
    v
  Jenkins
    |
    +----> Docker Build
    |
    +----> Docker Images
    |
    v
 Docker Hub
    |
    v
   Helm
    |
    v
 Kubernetes
    |
    +----> Frontend
    |
    +----> Backend
    |
    +----> PostgreSQL
```

## Technology Stack

### Application

* Python
* Django
* Django REST Framework
* PostgreSQL
* HTML
* CSS
* JavaScript

### DevOps

* Git
* GitHub
* Jenkins
* Docker
* Docker Hub
* Kubernetes
* Helm
* Nginx

## Project Structure

```text
python-django-helm-devops/
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── index.html
│   ├── app.js
│   └── style.css
│
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── ...
│   │
│   └── students/
│       ├── models.py
│       ├── views.py
│       ├── urls.py
│       └── ...
│
├── helm/
│   └── student-app/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── namespace.yaml
│           ├── postgres-secret.yaml
│           ├── postgres.yaml
│           ├── backend.yaml
│           └── frontend.yaml
│
├── docker-compose.yml
├── Jenkinsfile
├── .gitignore
└── README.md
```

## Application Features

The Student Management System provides basic CRUD operations for student records.

### Operations

* Add student
* View students
* Update student details
* Delete student

### Student Fields

* Name
* Email
* Course
* Age

## Docker

The frontend and backend are containerized separately.

### Frontend Container

The frontend uses Nginx to serve static files and handle API proxying.

```text
frontend/Dockerfile
```

### Backend Container

The backend uses Python, Django REST Framework, and Gunicorn.

```text
backend/Dockerfile
```

Separate Docker images allow the frontend and backend to be built, versioned, and deployed independently.

## Helm

Helm is used to package and manage the Kubernetes resources required by the application.

### Helm Chart

```text
helm/student-app/
│
├── Chart.yaml
├── values.yaml
└── templates/
    ├── namespace.yaml
    ├── postgres-secret.yaml
    ├── postgres.yaml
    ├── backend.yaml
    └── frontend.yaml
```

### Helm Configuration

Application configuration such as:

* Docker image repositories
* Image tags
* Replica counts
* Service types
* Service ports
* PostgreSQL configuration

is managed through:

```text
values.yaml
```

This makes the Kubernetes deployment configurable without modifying the individual templates.

## Kubernetes Resources

The Helm chart creates the following Kubernetes resources:

### Frontend

* Deployment
* Service

### Backend

* Deployment
* Service

### Database

* PostgreSQL Deployment
* PostgreSQL Service
* Kubernetes Secret

### Namespace

* Dedicated `student-app` namespace

## CI/CD Pipeline

The project includes a Jenkins pipeline for automating the application build and deployment workflow.

### Pipeline Flow

```text
GitHub
   |
   v
Jenkins
   |
   v
Build Frontend Docker Image
   |
   v
Build Backend Docker Image
   |
   v
Push Images to Docker Hub
   |
   v
Helm Upgrade / Install
   |
   v
Kubernetes
```

## Jenkins Pipeline Stages

The Jenkinsfile contains stages for:

1. Checkout source code
2. Build frontend Docker image
3. Build backend Docker image
4. Push Docker images to Docker Hub
5. Deploy the application using Helm

## Helm Deployment

The deployment is designed around the following command:

```bash
helm upgrade --install student-app ./helm/student-app
```

The image tags can be supplied dynamically during CI/CD:

```bash
helm upgrade --install student-app ./helm/student-app \
  --namespace student-app \
  --create-namespace \
  --set frontend.image.tag=<TAG> \
  --set backend.image.tag=<TAG>
```

This allows Jenkins to deploy different versions of the Docker images through Helm.

## Configuration

Before using the project, update the placeholder values in:

```text
helm/student-app/values.yaml
```

Example:

```yaml
frontend:
  image:
    repository: YOUR_DOCKERHUB_USERNAME/students-frontend

backend:
  image:
    repository: YOUR_DOCKERHUB_USERNAME/students-backend
```

Replace:

```text
YOUR_DOCKERHUB_USERNAME
```

with the appropriate Docker Hub username when configuring the project.

Do not commit real passwords, API keys, tokens, or other sensitive credentials to GitHub.

## Learning Objectives

This project demonstrates practical understanding of:

* Django REST API architecture
* 3-tier application architecture
* Docker containerization
* Docker image management
* Nginx reverse proxy
* Kubernetes Deployments
* Kubernetes Services
* Kubernetes Secrets
* Helm Charts
* Helm values and templates
* Jenkins CI/CD
* Docker Hub image management
* Git and GitHub workflow

## Kubernetes Deployment Approach

This project uses Helm instead of maintaining deployment configurations entirely as standalone Kubernetes manifests.

```text
Traditional Kubernetes
        |
        v
Deployment YAML
Service YAML
Secret YAML
        |
        v
Manual Management
```

With Helm:

```text
Helm Chart
     |
     +---- Chart.yaml
     |
     +---- values.yaml
     |
     +---- templates/
              |
              +---- Deployment
              +---- Service
              +---- Secret
```

## Project Purpose

This project is created for learning and portfolio purposes to demonstrate:

**Application Development → Containerization → CI/CD → Helm → Kubernetes**

It focuses on understanding how a containerized application can be packaged and managed using Helm in a Kubernetes environment.
