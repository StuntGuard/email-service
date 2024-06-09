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
        sh 'docker build -t asia-southeast2-docker.pkg.dev/capstone-project-424205/email-service/my-app .'
      }
    }

    stage('Push') {
      steps {
        sh 'docker push asia-southeast2-docker.pkg.dev/capstone-project-424205/email-service/my-app '
      }
    }

    stage('end') {
      steps {
        echo 'hello world'
      }
    }

  }
}