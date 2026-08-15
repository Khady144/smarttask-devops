pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'Sakhasow'
    }

    stages {
        stage('1. Nettoyage & Checkout') {
            steps {
                echo 'Nettoyage des sessions Docker et récupération du code...'
                sh '''
                    docker logout || true
                    rm -f ~/.docker/config.json || true
                '''
                checkout scm
            }
        }

        stage('2. Build & Push') {
            steps {
                echo 'Connexion, construction et publication des images...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        # 1. Connexion propre à Docker Hub
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        # 2. Construction des images
                        docker build -t $DOCKERHUB_USER/smarttask-backend:1.0 ./backend
                        docker build -t $DOCKERHUB_USER/smarttask-frontend:1.0 ./frontend

                        # 3. Envoi sur Docker Hub
                        docker push $DOCKERHUB_USER/smarttask-backend:1.0
                        docker push $DOCKERHUB_USER/smarttask-frontend:1.0

                        # 4. Déconnexion
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
            echo '✅ Pipeline exécuté avec succès et images publiées !'
        }
        failure {
            echo '❌ Échec du Pipeline.'
        }
    }
}
