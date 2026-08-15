pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'Sakhasow'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Récupération du code source depuis GitHub...'
                git branch: env.BRANCH_NAME ?: 'main', url: 'https://github.com/Khady144/smarttask-devops.git'
            }
        }

        stage('2. Build Docker Images') {
            steps {
                echo 'Construction des images Docker...'
                sh 'docker-compose build'
            }
        }

        stage('3. Tag Images') {
            steps {
                echo 'Attribution des tags Docker Hub...'
                sh "docker tag smarttask-backend:1.0 ${DOCKERHUB_USER}/smarttask-backend:1.0"
                sh "docker tag smarttask-frontend:1.0 ${DOCKERHUB_USER}/smarttask-frontend:1.0"
            }
        }

        stage('4. Push to Docker Hub') {
            steps {
                echo 'Connexion et publication sur Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh "docker push ${DOCKERHUB_USER}/smarttask-backend:1.0"
                    sh "docker push ${DOCKERHUB_USER}/smarttask-frontend:1.0"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès et images publiées sur Docker Hub !'
        }
        failure {
            echo '❌ Échec du Pipeline.'
        }
    }
}
