pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'Sakhasow'
    }

    stages {
        stage('1. Checkout') {
            steps {
                echo 'Récupération du code...'
                checkout scm
            }
        }

        stage('2. Build Images') {
            steps {
                echo 'Construction des images...'
                sh 'docker compose build || docker-compose build'
            }
        }

        stage('3. Tag Images') {
            steps {
                echo 'Tag des images pour Docker Hub...'
                sh "docker tag smarttask-backend:1.0 ${DOCKERHUB_USER}/smarttask-backend:1.0"
                sh "docker tag smarttask-frontend:1.0 ${DOCKERHUB_USER}/smarttask-frontend:1.0"
            }
        }

        stage('4. Push to Docker Hub') {
            steps {
                echo 'Publication sur Docker Hub...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        sh "docker push ${DOCKERHUB_USER}/smarttask-backend:1.0"
                        sh "docker push ${DOCKERHUB_USER}/smarttask-frontend:1.0"
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès et images publiées !'
        }
        failure {
            echo '❌ Échec du Pipeline.'
        }
    }
}
