this is a project for the task number 3

just run the file page.js with npm run dev in on your device, this app fetches data with the jsonplaceholder api, specifically the comments.
you can also filter the comments by their ID. 
https://jsonplaceholder.typicode.com/ 

this project is deploy in azure pages on this link https://zealous-hill-05c76e61e.2.azurestaticapps.net/
first step configuration
variable invoriment lika a static_web_key is the private-keys for azurePage TOKEN
first step build application with the task nodetools select correct version and use the correct script
npm ci -> install essentials dependecies 
npm build -> in package.json there are a json object with the script for next js like a npx build, this scripts build application and returns the out folder
copy files -> copy all files from out folder and puts in the artifact folder
zip directory -> search artifact directory and compress the folder into file .zip
publish artifact -> share the  zip artefect 

setting pipelines
trigger:
- main

pool:
  vmImage: ubuntu-latest

variables:
- group: static_web_keys

stages:
- stage: Build
  jobs:
  - job: Build
    displayName: 'Build & Export Next.js App'
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '20.x'
      displayName: 'Install Node.js'
    - task: CmdLine@2
      displayName: 'Build & Export Next.js'
      inputs:
        script: |
          npm ci
          npm run build
    - task: CopyFiles@2
      inputs:
        Contents: 'out/**'
        TargetFolder: '$(Build.ArtifactStagingDirectory)'
    - task: ArchiveFiles@2
      inputs:
        rootFolderOrFile: '$(Build.ArtifactStagingDirectory)'
        includeRootFolder: true
        archiveType: zip
        archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
        replaceExistingArchive: true
    - task: PublishPipelineArtifact@1
      inputs:
        targetPath: '$(Build.ArtifactStagingDirectory)'
        artifact: 'drop'

second stage
unzip the artefact in the drop artefact on the react directory $(Pipeline.Workspace)/reactApp'
last step send the static files to azure pages for deploy

- stage: Unzip
  dependsOn: Build
  jobs:
  - job: UnzipJob
    displayName: 'Extract Build Artifact'
    steps:
    - download: current
      artifact: drop
    - task: ExtractFiles@1
      inputs:
        archiveFilePatterns: '$(Pipeline.Workspace)/drop/$(Build.BuildId).zip'
        destinationFolder: '$(Pipeline.Workspace)/reactApp'
        cleanDestinationFolder: true
        overwriteExistingFiles: true

    - script: |
        ls -la $(Pipeline.Workspace)/reactApp/a/
      displayName: 'check unzip'
    - task: AzureStaticWebApp@0
      inputs:
        workingDirectory: '$(Pipeline.Workspace)/reactApp'
        app_location: 'a/out'
        skip_app_build: true
        skip_api_build: true
        is_static_export: true
        azure_static_web_apps_api_token: $(SWAToken)
