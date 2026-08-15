pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'sakhasow'
    }

    stages {
        stage('1. Checkout') {
            steps {
                echo 'Récupération du code source...'
                checkout scm
            }
        }

        stage('2. Build Images') {
            steps {
                echo 'Construction des images...'
                sh '''
                    docker build -t $DOCKERHUB_USER/smarttask-backend:1.0 ./backend
                    docker build -t $DOCKERHUB_USER/smarttask-frontend:1.0 ./frontend
                '''
            }
        }

        stage('3. Connexion & Push') {
            steps {
                echo 'Publication sur Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        printf '%s' "$DOCKER_PASS" | docker login -u sakhasow --password-stdin

                        docker push $DOCKERHUB_USER/smarttask-backend:1.0
                        docker push $DOCKERHUB_USER/smarttask-frontend:1.0

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo '✅ SUCCÈS : Pipeline exécuté et images publiées !'
        }
        failure {
            echo '❌ ÉCHEC du pipeline.'
        }
    }
}
