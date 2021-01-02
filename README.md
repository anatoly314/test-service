- Build image: `docker build --tag test-service .`
- Run: `docker-compose up`

- There are 4 services:

    - localhost:3000
    - localhost:3001
    - localhost:3002
    - localhost:3003

- To create resource issue `post` request to any service: `http://<service_uri>/v1/resource`, 
if resource was successfully stored, `resourceId` will be returned
  
- To get resource from any service issue `get` request to any service:
`http://<service_uri>/v1/resource/<resourceId>`

Credits:
  - based on: https://github.com/danielfsousa/express-rest-boilerplate
