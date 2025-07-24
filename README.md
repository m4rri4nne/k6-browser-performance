# 🚀 Browser Performance Testing with k6

A project to automate browser-based performance testing using k6, with the goal of measuring user experience, generating reports, and integrating performance checks into continuous integration workflows.

## Setup

- Have a latest version of node and npm installed 
- [Install K6](https://grafana.com/docs/k6/latest/set-up/install-k6/)

> Technical notes about K6 and steps to understand how the k6 browser works you can find [here](./k6-learning/k6-notes.md).


## The tests 

For this tutorial, we will use the [Swag Labs](https://www.saucedemo.com) that is a simulation of an e-commerce.

As we're talking about performance tests, our main focus here will be to capture metrics on pages that are important to end users and with them we'll define how the tests will be.

Therefore, we should be concerned with collecting data from the following flow:
- Do login 
- Add items to the cart
- Checkout

And for the tests, we will use two different users that are provided by the app: 
- standard_user
- performance_glitch_user

This way we can compare the performance between them and analyze the results. 

> The file on the libs folder, was created because k6 supports remote modules via URL (as if it were a CDN), but the local editor doesn't understand this natively, as it only expects local files or Node.js modules.