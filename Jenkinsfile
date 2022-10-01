pipeline {
    agent any

    stages {
        stage("Prune Docker data") {
            steps {
                sh "docker system prune -a -f"
            }
        }
        stage("Start Docker") {
            steps {
                sh "docker-compose up --profile production -d"
                sh "docker-compose ps"
            }
        }
    }
}