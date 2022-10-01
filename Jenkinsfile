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
                sh "docker-compose -f docker-compose.prod.yaml up -d"
                sh "docker-compose ps"
            }
        }
    }
}