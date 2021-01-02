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
  
- All requests MUST have `Authentication` header with **jwt** token generated 
with following key: `bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4`
  - You can use [jwt.io](jwt.io) to generate required token

Credits:
  - based on: https://github.com/danielfsousa/express-rest-boilerplate
