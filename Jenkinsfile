pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git(url: 'https://github.com/StuntGuard/email-service', branch: 'master')
      }
    }

    stage('Build') {
      steps {
        sh 'sudo docker build -t asia-southeast2-docker.pkg.dev/capstone-project-424205/email-service -f email-service/Dockerfile . '
      }
    }

    stage('Push To Artifact Registry') {
      steps {
        sh 'sudo docker push asia-southeast2-docker.pkg.dev/capstone-project-424205/email-service'
      }
    }

  }
}