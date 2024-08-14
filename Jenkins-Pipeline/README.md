# Basic To Advanced Pipeline 

## Clean WorkSpace
```
pipeline {
    agent any 
    tools {
        jdk 'jdk11'
        maven 'maven3'
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
    }
}
```

## 1. Checkout_SCM

```
pipeline {
    agent any 
    tools {
        jdk 'jdk11'
        maven 'maven3'
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
    }
}
```
## 2. Maven Build

```
pipeline {
    agent any 
    tools {
        jdk 'jdk11'
        maven 'maven3'
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
    }
}
```
## 3. SonarQube Analysis
```
pipeline {
    agent any 
    tools {
        jdk 'jdk11'
        maven 'maven3'
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
    }
}
```
## 4. OWASP DP-Check
```
pipeline {
    agent any 
    tools {
        jdk 'jdk11'
        maven 'maven3'
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
        stage("OWASP Dependency Check"){
             steps{
                 dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'DP-Check'
                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
             }
        }
    }
}
```
## 5. Quality Gate
```
pipeline {
    agent any 
    tools {
        jdk 'jdk11'
        maven 'maven3'
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
        stage("OWASP Dependency Check"){
             steps{
                 dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'DP-Check'
                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
             }
        }
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 

            }
        }
    }
}
```
## 6. Build war file
```
pipeline {
    agent any 
    tools {
        jdk 'jdk11'
        maven 'maven3'
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
        stage("OWASP Dependency Check"){
             steps{
                 dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'DP-Check'
                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
             }
        }
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 

            }
        }
        stage ('Build war file'){
             steps{
                 sh 'mvn clean install package'
             }
        }
    }
}
```
## 7. Build Docker Image
```
pipeline{
    agent any

    environment {
        APP_NAME = "image_name"
        RELEASE = "latest"
        DOCKER_USER = "fir3eye"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}" 
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
        stage("OWASP Dependency Check"){
             steps{
                 dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'DP-Check'
                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
             }
        }
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 

            }
        }
        stage ('Build war file'){
             steps{
                 sh 'mvn clean install package'
             }
        }
        stage("Build Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        sh "docker images --format '{{.Repository}}:{{.Tag}}' | grep ${IMAGE_NAME} | grep -v ${RELEASE}-${BUILD_NUMBER} | grep -v latest | xargs -I {} docker rmi {} || true" 
                        docker_image = docker.build "${IMAGE_NAME}"
                    }
                }
            }
        }
    }
}

```
## 8. Trivy File Scan
```
pipeline{
    agent any

    environment {
        APP_NAME = "image_name"
        RELEASE = "latest"
        DOCKER_USER = "fir3eye"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}" 
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
        stage("OWASP Dependency Check"){
             steps{
                 dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'DP-Check'
                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
             }
        }
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 

            }
        }
        stage ('Build war file'){
             steps{
                 sh 'mvn clean install package'
             }
        }
        stage("Build Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        sh "docker images --format '{{.Repository}}:{{.Tag}}' | grep ${IMAGE_NAME} | grep -v ${RELEASE}-${BUILD_NUMBER} | grep -v latest | xargs -I {} docker rmi {} || true" 
                        docker_image = docker.build "${IMAGE_NAME}"
                    }
                }
            }
        }
        stage("Trivy Scan") {
            steps {
                script {
                    sh "trivy image ${docker_image.id} > trivy.txt"
                }
            }
        }                   
    }
}

```
## 9. Push Image on Docker
```
pipeline{
    agent any

    environment {
        APP_NAME = "image_name"
        RELEASE = "latest"
        DOCKER_USER = "fir3eye"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}" 
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
        stage("OWASP Dependency Check"){
             steps{
                 dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'DP-Check'
                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
             }
        }
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 

            }
        }
        stage ('Build war file'){
             steps{
                 sh 'mvn clean install package'
             }
        }
        stage("Build Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        sh "docker images --format '{{.Repository}}:{{.Tag}}' | grep ${IMAGE_NAME} | grep -v ${RELEASE}-${BUILD_NUMBER} | grep -v latest | xargs -I {} docker rmi {} || true" 
                        docker_image = docker.build "${IMAGE_NAME}"
                    }
                }
            }
        }
        stage("Trivy Scan") {
            steps {
                script {
                    sh "trivy image ${docker_image.id} > trivy.txt"
                }
            }
        }
        stage("Push Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS){
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }
                }
            }
        }                     
    }
}

```
## 10. Deploy on Docker
```
pipeline{
    agent any

    environment {
        APP_NAME = "image_name"
        RELEASE = "latest"
        DOCKER_USER = "fir3eye"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}" 
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
        stage("OWASP Dependency Check"){
             steps{
                 dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'DP-Check'
                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
             }
        }
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 

            }
        }
        stage ('Build war file'){
             steps{
                 sh 'mvn clean install package'
             }
        }
        stage("Build Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        sh "docker images --format '{{.Repository}}:{{.Tag}}' | grep ${IMAGE_NAME} | grep -v ${RELEASE}-${BUILD_NUMBER} | grep -v latest | xargs -I {} docker rmi {} || true" 
                        docker_image = docker.build "${IMAGE_NAME}"
                    }
                }
            }
        }
        stage("Trivy Scan") {
            steps {
                script {
                    sh "trivy image ${docker_image.id} > trivy.txt"
                }
            }
        }
        stage("Push Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS){
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }
                }
            }
        } 
        stage ('Deploy to Container') {
            steps {
                sh 'docker run -d --name pet1 -p 8082:8080 fir3eye/image_name:latest'
            }
        }
    }
}

```

## 11. Clean Artifactory
```
pipeline{
    agent any

    environment {
        APP_NAME = "image_name"
        RELEASE = "latest"
        DOCKER_USER = "fir3eye"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}" 
    }
    stages{
        stage("Clean WorkSpace"){
            steps {
                cleanWs()
            }
        }
        stage("Checkout SCM"){
            steps {
                git 'https://github.com/Fir3eye/pr_03_amazon-eks-jenkins-terraform.git'
            }
        }
        stage("Maven Compile"){
            steps {
                sh 'mvn clean compile'
            }
        }
        stage("SonarQube Analysis"){
            steps{
                script{
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }
        stage("OWASP Dependency Check"){
             steps{
                 dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'DP-Check'
                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
             }
        }
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 

            }
        }
        stage ('Build war file'){
             steps{
                 sh 'mvn clean install package'
             }
        }
        stage("Build Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        sh "docker images --format '{{.Repository}}:{{.Tag}}' | grep ${IMAGE_NAME} | grep -v ${RELEASE}-${BUILD_NUMBER} | grep -v latest | xargs -I {} docker rmi {} || true" 
                        docker_image = docker.build "${IMAGE_NAME}"
                    }
                }
            }
        }
        stage("Trivy Scan") {
            steps {
                script {
                    sh "trivy image ${docker_image.id} > trivy.txt"
                }
            }
        }
        stage("Push Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS){
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }
                }
            }
        } 
        stage ('Deploy to Container') {
            steps {
                sh 'docker run -d --name pet1 -p 8082:8080 fir3eye/image_name:latest'
            }
        }
    }
}


```
## Environment
```
pipeline{
    agent any
    tools {
        jdk 'jdk11'
        maven 'maven3'
    }
    environment {
        APP_NAME = "image_name"
        RELEASE = "latest"
        DOCKER_USER = "fir3eye"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}" 
    }
    stages{
        stage("Cleanup Workspace"){
            steps{
                cleanWs()
            }
        }
        stage("Checkout from SCM"){
            steps{
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/Fir3eye/pr_01_docker_push_img.git'
            }
        }
        stage("Build Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        docker_image = docker.build "${IMAGE_NAME}"
                    }
                }
            }
        }
        stage("Trivy Scan") {
            steps {
                script {
                    sh "trivy image ${docker_image.id} > trivy.txt"
                }
            }
        }
        stage("Push Docker Image"){
            steps{
                script {
                    docker.withRegistry('',DOCKER_PASS){
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }
                }
            }
        }

        stage ('Cleanup Artifacts') {
            steps {
                script {
                    sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker rmi ${IMAGE_NAME}:latest"
                }
            }
        }
        stage("Sonarqube Analysis") {
            steps {
                script {
                    withSonarQubeEnv(credentialsId: 'jenkins-sonarqube-token') {
                        sh "mvn sonar:sonar"
                    }
                }
            }
        }
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 

            }
        }
    }
}

```