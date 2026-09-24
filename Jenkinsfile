pipeline {

    agent any

    environment {
        DOCKER_USERNAME = 'YOUR_DOCKERHUB_USERNAME'

        FRONTEND_IMAGE = "${DOCKER_USERNAME}/students-frontend"
        BACKEND_IMAGE = "${DOCKER_USERNAME}/students-backend"

        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                    docker build \
                    -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    ./frontend
                """
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                    docker build \
                    -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    ./backend
                """
            }
        }

        stage('Push Docker Images') {
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
                    '''

                    sh """
                        docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Helm Deployment') {
            steps {
                sh """
                    helm upgrade --install student-app \
                    ./helm/student-app \
                    --namespace student-app \
                    --create-namespace \
                    --set frontend.image.tag=${IMAGE_TAG} \
                    --set backend.image.tag=${IMAGE_TAG}
                """
            }
        }
    }
}