pipeline {
    agent any

    stages {
        stage('update deploy file') {
            when {
                anyOf {
                  branch 'master';
                  branch 'dev';
                  branch 'show';
                }
            }
            steps {
                sh 'cp /var/jenkins_home/deploy/ras-web/deploy.sh .'
            }
        }
        stage('update code and build') {
            when {
                anyOf {
                  branch 'master';
                  branch 'dev';
                  branch 'show';
                }
            }
            steps {
                sh 'chmod 700 ./deploy.sh'
                sh './deploy.sh ${BRANCH_NAME}'
            }
        }
    }
}
