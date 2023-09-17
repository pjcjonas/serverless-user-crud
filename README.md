# USER TASK MANAGER API

This is a `serverless framework project` that has user crud features as well as user task crud features. It uses `localstack` as well as `serverless-offline`. 

## Pre-requisites:
1. NodeJS `v16.20.2`
2. Docker CE
3. AWS Cli
4. YARN

## Setup and Installation

### Environment files
1. copy and rename `.env.local.example` to just be `.env.local`.
    - Update the env vars with the relivant information
2. Run `yarn install` to install and add all the `npm` packages
3. Start the `docker engine`
    - Once the docker engine is running, run the following command in the root of the project
        - `docker-compose up`: this will startup the docker containers for `mysql`, `localstack`, `adminer`
            - adminer is a mini container to inspect the mysql db. `http://localhost:8080` will bootup the web ui for adminer so that you can verify and test the db changes.
4. Import the `Postman collections`:
    - `Task Crud Calls.postman_collection.json`
    - `User Crud  Calls.postman_collection.json`
5. Start the serverless offline environement
    - Once running you should see the following endpoints, **NOTE: These exist in postman already**:
    - POST     http://localhost:4000/local/users 
    - GET      http://localhost:4000/local/users/{user_id}
    - GET      http://localhost:4000/local/users 
    - PUT      http://localhost:4000/local/users/{user_id}
    - POST     http://localhost:4000/local/users/{user_id}/tasks 
    - GET      http://localhost:4000/local/users/{user_id}/tasks 
    - GET      http://localhost:4000/local/users/{user_id}/tasks/{task_id}
    - PUT      http://localhost:4000/local/users/{user_id}/tasks/{task_id}
    - DELETE   http://localhost:4000/local/users/{user_id}/tasks/{task_id}
