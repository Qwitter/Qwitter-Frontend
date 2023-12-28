pipeline {  
    agent any  
    tools {nodejs "nodejs"}
    options{
        disableConcurrentBuilds()
    }
    stages {  
        stage('Install Dependencies') {  
            steps {  
                sh 'npm install'
            }
        }  
        stage('Test') {  
            steps {  
                echo 'test'
                sh 'npm run cicd-test'
            }
        }
        stage('Build') {  
            steps {  
                sh 'npm run build'
            }
        }
    }  
       
    post {   
        success {  
            echo 'This will run only if successful'  
        }  
        failure {  
            echo 'Failure'
            mail bcc: '', body: "<b>Failure</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br>", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "sofa5060@gmail.com";  
        }  
        changed {  
            script{
                if(currentBuild.result == 'SUCCESS' && currentBuild.getPreviousBuild().result == 'FAILURE') {
                    mail bcc: '', body: "<b>Back to work</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br>", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "Successful CI: Project name -> ${env.JOB_NAME}", to: "sofa5060@gmail.com";    
                }
            }  
        }  
    }
}
