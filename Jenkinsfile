pipeline {
    agent any

    stages {
        stage("Prune Docker data") {
            steps {
                sh "docker system prune -a -f"
            }
        }
        stage("Create .env file") {
            steps {
                sh "rm .env"
                sh "touch .env"
                sh "echo 'DATABASE_URL'=$DATABASE_URL >> '.env'"
                sh "echo 'KEYCLOAK_DB_ADDR'=$KEYCLOAK_DB_ADDR >> '.env'"
                sh "echo 'KEYCLOAK_DB_DATABASE'=$KEYCLOAK_DB_DATABASE >> '.env'"
                sh "echo 'KEYCLOAK_DB_PASSWORD'=$KEYCLOAK_DB_PASSWORD >> '.env'"
                sh "echo 'KEYCLOAK_DB_SCHEMA'=$KEYCLOAK_DB_SCHEMA >> '.env'"
                sh "echo 'KEYCLOAK_DB_USER'=$KEYCLOAK_DB_USER >> '.env'"
                sh "echo 'KEYCLOAK_USER'=$KEYCLOAK_USER >> '.env'"
                sh "echo 'KEYCLOAK_PASSWORD'=$KEYCLOAK_PASSWORD >> '.env'"
                sh "echo 'POSTGRES_DB'=$POSTGRES_DB >> '.env'"
                sh "echo 'POSTGRES_PASSWORD'=$POSTGRES_PASSWORD >> '.env'"
                sh "echo 'POSTGRES_PORT'=$POSTGRES_PORT >> '.env'"
                sh "echo 'POSTGRES_USER'=$POSTGRES_USER >> '.env'"
                sh "echo 'SERVER_IP'=$SERVER_IP >> '.env'"
            }
        }
        stage("Start Docker") {
            steps {
                sh "docker-compose -f docker-compose.prod.yaml down"
                sh "docker-compose -f docker-compose.prod.yaml up -d"
                sh "docker-compose ps"
            }
        }
    }
}