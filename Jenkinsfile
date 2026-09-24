pipeline {

    agent any

    environment {
        DOCKER_USERNAME = 'abhisalunke16'

        FRONTEND_IMAGE = 'abhisalunke16/python-django-helm-frontend'
        BACKEND_IMAGE  = 'abhisalunke16/python-django-helm-backend'

        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/abhijeet-salunke-in/python-django-helm.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=python-django-helm \
                        -Dsonar.projectName=python-django-helm \
                        -Dsonar.sources=.
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    docker build \
                    -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    ./frontend
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build \
                    -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    ./backend
                '''
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker_hub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                        -u "$DOCKER_USER" \
                        --password-stdin

                        docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Helm Lint') {
            steps {
                sh '''
                    helm lint ./helm/student-app
                '''
            }
        }

        stage('Helm Deployment') {
            steps {
                sh '''
                    helm upgrade --install student-app \
                    ./helm/student-app \
                    --namespace student-app \
                    --create-namespace \
                    --set frontend.image.repository=${FRONTEND_IMAGE} \
                    --set frontend.image.tag=${IMAGE_TAG} \
                    --set backend.image.repository=${BACKEND_IMAGE} \
                    --set backend.image.tag=${IMAGE_TAG}
                '''
            }
        }

        stage('Verify Helm Deployment') {
            steps {
                sh '''
                    helm list -n student-app

                    helm status student-app \
                    -n student-app

                    kubectl get pods \
                    -n student-app

                    kubectl get deployments \
                    -n student-app

                    kubectl get services \
                    -n student-app
                '''
            }
        }
    }

    post {

        success {
            echo 'Django Helm CI/CD pipeline completed successfully.'
        }

        failure {
            echo 'Django Helm CI/CD pipeline failed.'
        }
    }
}
