pipeline {
    agent any
    
    tools {
        nodejs 'node22' // This must match the name you gave in Tools
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs packages from your package.json
                sh 'npm ci'
                // Installs browsers and OS dependencies (crucial for Linux agents)
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                // Runs your tests. Use --reporter=html for local reports
                sh 'npx playwright test --project chromium'
            }
        }
    }

    post{
        always {
            // This saves your report so you can see why tests failed
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            
            // If you have the HTML Publisher plugin installed:
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}