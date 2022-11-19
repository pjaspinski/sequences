pipeline {
    agent {
        docker {
            image 'node:16.14.0' 
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

