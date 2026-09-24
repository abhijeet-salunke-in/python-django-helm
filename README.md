# Python Django 3-Tier Application

A containerized three-tier Student Management application built with a lightweight frontend, Django REST API, and PostgreSQL database.

## Architecture

Frontend (Nginx) → Backend (Django REST API) → Database (PostgreSQL)

## Technology Stack

- Frontend: HTML, CSS, JavaScript, Nginx
- Backend: Python, Django, Django REST Framework
- Database: PostgreSQL
- Containerization: Docker
- Orchestration: Kubernetes
- CI/CD: Jenkins
- Code Quality: SonarQube
- Container Registry: Docker Hub
- Cloud Target: AWS EC2

## Project Structure

```text
python-django-3tier-devops/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── index.html
│   ├── app.js
│   └── style.css
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   ├── config/
│   └── students/
├── k8s/
│   ├── namespace.yaml
│   ├── postgres-secret.yaml
│   ├── postgres.yaml
│   ├── backend.yaml
│   └── frontend.yaml
├── Jenkinsfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

## DevOps Workflow

GitHub → Jenkins → SonarQube → Docker Build → Docker Hub → Kubernetes → AWS EC2

> This repository is structured as a portfolio/learning project. Replace example credentials and image names with your own values before deployment.
