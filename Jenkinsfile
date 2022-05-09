node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build Docker test'){
     sh 'docker build -t react-test -f Dockerfile --no-cache .'
    }
    stage('Docker test'){
      sh 'docker run --rm react-test'
    }
  }
  catch (err) {
    throw err
  }
}