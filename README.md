<<<<<<< HEAD
<<<<<<< HEAD
# transactions-api
=======
=======
>>>>>>> 464acb6 (chore: update documentation)
## Deel Backend Task
- By Moses Idowu
### Getting Started
- Setup .env and env.test.local environment variable using env.local.sample.

- To run the application locally

```
yarn install
yarn db:migrate - run a migration to create the tables for the model
yarn db:seed - seed data to database
yarn start - to start the application
yarn test - to process unit testing and integration testing
```

### Created API
The API documentation in details
- [https://documenter.getpostman.com/view/23489519/2s9YeBcsYs]
  
The app API was organised into two modules for easy maintainability
#### Transactions
- http://localhost:4500/deel/v1/transactions/contracts - GET
- http://localhost:4500/deel/v1/transactions/contracts/:id - GET
- http://localhost:4500/deel/v1/transactions/jobs/:paidStatus - GET
- http://localhost:4500/deel/v1/transactions/jobs/:jobId/pay - POST
- http://localhost:4500/deel/v1/transactions/balances/deposit/:userId - POST
  
#### Admin
  - http://localhost:4500/deel/v1/admin/best-profession - GET
  - http://localhost:4500/deel/v1/admin/best-clients - GET

#### Things Achieved
- Migrate from Javascript to Typescript
- Project structuring
- Writing of Test cases
- Using of PostgresSQL
- Schema Validation
- Using of DB Transaction
- Using of cluster Module for managing concurrency
- Using of logger
- Error handling middlewares

#### Thing I would have love to add
- Write more test cases
- Setup CI/CD tools
- Setup docker for the project
- Add authentication
<<<<<<< HEAD
>>>>>>> 464acb6 (chore: update documentation)
=======
>>>>>>> 464acb6 (chore: update documentation)
