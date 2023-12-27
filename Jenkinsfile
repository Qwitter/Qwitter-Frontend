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
                // sh 'cp /home/fares/.env.local /var/lib/jenkins/workspace/Qwitter_Front_pipeline_main'
            }
        }  
        // stage('Test') {  
            // steps {  
                //sh 'npm run test'
            // }
        // // }
        // stage('e2e') {  
        //     steps {  
        //         // sh 'npm run test'
        //         dir ("/home/fares/Qwitter-Testing/Web"){
        //             sh 'pwd'
        //         }
        //     }
        // }
        // stage('Build') {  
        //     steps {  
        //         sh 'npm run build'
        //     }
        // }
        // stage('Deploy') {  
        //     steps {  
        //         sh 'docker compose build'
        //         sh 'docker compose push'
        //         sh 'docker system prune -f'
        //     }
        // } 
    }  
       
    // post {   
    //     success {  
    //         echo 'This will run only if successful'  
    //     }  
    //     failure {  
    //         echo 'Failure'
    //         //mail bcc: '', body: "<b>Failure</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br>", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "sofa5060@gmail.com";  
    //     }  
    //     changed {  
    //         script{
    //             if(currentBuild.result == 'SUCCESS' && currentBuild.getPreviousBuild().result == 'FAILURE') {
    //                 mail bcc: '', body: "<b>Back to work</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br>", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "Successful CI: Project name -> ${env.JOB_NAME}", to: "sofa5060@gmail.com";    
    //             }
    //         }  
    //     }  
    // }
}
