pipeline {
    agent any

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Récupération du code source depuis GitHub...'
                git branch: 'main', url: 'https://github.com/Khady144/smarttask-devops.git'
            }
        }

        stage('2. Build Docker Images') {
            steps {
                echo 'Construction des images Docker du projet SmartTask...'
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
