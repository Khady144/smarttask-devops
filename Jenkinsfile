pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'Sakhasow'
    }

    stages {
        stage('1. Checkout') {
            steps {
                echo 'Récupération du code source...'
                checkout scm
            }
        }

        stage('2. Build & Tag Images') {
            steps {
                echo 'Construction et tag direct des images Docker...'
                sh "docker build -t ${DOCKERHUB_USER}/smarttask-backend:1.0 ./backend"
                sh "docker build -t ${DOCKERHUB_USER}/smarttask-frontend:1.0 ./frontend"
            }
        }

        stage('3. Push to Docker Hub') {
            steps {
                echo 'Publication sur Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKERHUB_USER}/smarttask-backend:1.0
                        docker push ${DOCKERHUB_USER}/smarttask-frontend:1.0
                    '''
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
