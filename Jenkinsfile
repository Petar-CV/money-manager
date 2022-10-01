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
                sh "docker-compose up -f docker-compose.prod.yml -d"
                sh "docker-compose ps"
            }
        }
    }
}