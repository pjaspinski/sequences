pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 5002:5002' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}

