# 🚀 Browser Performance Testing with k6

A project to automate browser-based performance testing using k6, with the goal of measuring user experience, generating reports, and integrating performance checks into continuous integration workflows.

## Setup

- Have a latest version of node and npm installed 
- [Install K6](https://grafana.com/docs/k6/latest/set-up/install-k6/)

> Technical notes about K6 and steps to understand how the k6 browser works you can find [here](./k6-learning/k6-notes.md).


## The tests 

For this project, I will use the [Swag Labs](https://www.saucedemo.com) that is a simulation of an e-commerce.

For this project, the focus is on Browser-based loading test.
Browser-based load testing verifies the frontend performance of an application by simulating real users using a browser to access your website.
Therefore, we should be concerned with collecting data from the following flow:
- Login 
- Add items to the cart
- Checkout

And for the tests, we will use two different users that are provided by the app: 
- standard_user
- performance_glitch_user

This way we can compare the performance between them and analyze the results. 

## How to run the tests and generate reports 

Give permission: 

```bash
  chmod +x run-tests.sh
```

To run: 
```bash
  ./run-tests.sh
```

> K6 has a limitation to run only one script per time

There's a native way to get the reports from k6 executions, you need to use the parameter `K6_WEB_DASHBOARD=true` and it'll generate a report for each run.
If you have more than one test file, k6 will generate different reports for each file.
The bash script will be responsible to define if only one test will be executed or more than one and save each report run in the `results` folder. 

> It is possible to have this report generated using Grafana, but you need to pay for it. 


