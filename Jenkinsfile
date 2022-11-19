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
                sshagent(credentials: ['ssh-credentials-id']) {
                    sh '''
                      [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                      ssh-keyscan -t rsa,dsa github.com >> ~/.ssh/known_hosts
                      ssh pjaspinski-jenkins@github.com ...
                    '''
                }
                sh 'npm install' 
            }
        }
    }
}

