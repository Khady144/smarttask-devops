pipeline {
    agent any

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Récupération du code source depuis GitHub...'
                git branch: 'main', url: 'https://github.com/Khady144/smarttask-devops.git'
            }
        }

        stage('2. Test Backend') {
            steps {
                echo 'Vérification des dépendances Backend via Node Docker...'
                sh 'docker run --rm -v $(pwd)/backend:/app -w /app node:20-alpine npm install'
            }
        }

        stage('3. Build Docker Images') {
            steps {
                echo 'Construction des images Docker via Compose...'
                sh 'docker compose build'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès !'
        }
        failure {
            echo '❌ Échec du Pipeline.'
        }
    }
}
