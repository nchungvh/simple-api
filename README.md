# simple-api
## Prerequisies 
Setup *dev-account* for near-api-js and issue an example of Fungible Token:
* Install NEAR-CLI and create an *dev-account* of NEAR-CLI: [NEAR-CLI Docs](https://docs.near.org/vi/docs/tools/near-cli)
* Deploy example smart-contract to test Fungible Token transfer: [Fungible Token Example](https://github.com/near-examples/FT)
## Deploy
Firstly, we need put the *dev-account* created above step to 'devAccount' variable in file 'common/config.ts'
Steps to deploy:
- npm install
- npm run compile
- npm run start
API Logs will be saved at logger.log
## Features
1. Create an account: *http://localhost:3100/create*
Create account feature take 3 params:
- seedPhrase: 12 random words that will generate the keypair of the account
- newAccountId: the Id of new account
- amount: the init account balance (that will be transfer from *dev-account*)
2. Get account balance: *http://localhost:3100/balance/${id}*
Get account balance feature take 1 route param and will return the total balance of requested account (amount in yoctoNEAR): 
- id: the Id of requested account
3. Transfer Native Token: *http://localhost:3100/transfer*
Transfer Native Token feature take 3 param: 
- senderId: the Id of sender account
- receiverId:the Id of receiver account
- amount: the amount of token that will be transfered
4. Transfer Fungible Token: *http://localhost:3100/fungibletransfer*
Transfer Fungible Token feature take 3 param: 
- senderId: the Id of sender account
- receiverId:the Id of receiver account
- amount: the amount of token that will be transfered
5. Get transaction changes history by accountId: *http://localhost:3100/history/${id}*
Get transaction changes history by accountId feature take 1 route param: 
- id: the Id of requested account
6. Get Token holded in account: *http://localhost:3100/hold/${id}*
Get Token holded feature take 1 route param: 
- id: the Id of requested account
