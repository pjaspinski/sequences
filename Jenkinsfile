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
                    dpkg --add-architecture i386 
                    mkdir -pm755 /etc/apt/keyrings
                    wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
                    wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/bullseye/winehq-bullseye.sources
                    apt update
                    apt install -y wine-stable-i386
                    apt install -y wine-stable-amd64
                    apt install -y --install-recommends winehq-stable
                '''
            }
        }
        stage('Install mono') {
            steps {
                sh '''
                    apt install -y apt-transport-https dirmngr gnupg ca-certificates
                    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
                    echo "deb https://download.mono-project.com/repo/debian stable-buster main" | tee /etc/apt/sources.list.d/mono-official-stable.list
                    apt update
                    apt install -y mono-complete
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
    post {
        success {
            sh '''
                apt install -y golang-go 
                go get github.com/github-release/github-release
                GITHUB_RELEASE_PATH=$HOME/go/bin/github-release
                $GITHUB_RELEASE_PATH delete --user pjaspinski --repo sequences --tag release || echo "No release to delete"
                $GITHUB_RELEASE_PATH release --user pjaspinski --repo sequences --tag release --name "Current master build"
                $GITHUB_RELEASE_PATH upload --user pjaspinski --repo sequences --tag release --name "SequencesInstaller.exe" --file "desktop-gui/out/make/squirrel.windows/x64/desktop-gui-1.0.0 Setup.exe"
            '''
        }
    }
}

