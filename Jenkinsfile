pipeline {
    agent {
        docker {
            image 'node:16.14.0' 
            args '-p 5002:5002' 
        }
    }
    environment {
        DOCKER_BUILDKIT = "1"
    }
    stages {
        stage('Build') { 
            steps {
                sshagent(credentials: ['982274be-2227-434a-9400-364b8e925bc2']) {
                    sh '''
                      [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                      ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
                    '''
                }
                sh 'npm install' 
            }
        }
    }
}

