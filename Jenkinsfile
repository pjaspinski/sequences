pipeline {
    agent {
        docker {
            image 'node:16.14.0-bullseye' 
            args '-p 5002:5002' 
        }
    }
    stages {
        stage('NPM install') { 
            steps {
                sshagent(credentials: ['982274be-2227-434a-9400-364b8e925bc2']) {
                    sh '''
                        [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                        ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
                        npm install
                    '''
                }
            }
        }
        stage('Build client frontend') {
            steps {
                sh '''
                    cd frontend
                    npm run build
                '''
            }
        }
        stage('Build backend server') {
            steps {
                sh '''
                    cd backend
                    npm run build
                '''
            }
        }
        stage('Install wine') {
            steps {
                sh '''
                    mkdir -pm755 /etc/apt/keyrings
                    wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
                    wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/bullseye/winehq-bullseye.sources
                    apt update
                    apt install -y wine-stable-amd64
                    apt install -y --install-recommends winehq-stable
                '''
            }
        }
        stage('Build electron app') {
            steps {
                sh '''
                    cd desktop-gui
                    npm run build
                '''
            }
        }
    }
}

