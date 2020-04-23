# AWS Project

https://www.reddit.com/r/sysadmin/comments/8inzn5/so_you_want_to_learn_aws_aka_how_do_i_learn_to_be/

Project Overview
This uses a website as an excuse to use all the technologies AWS puts at your fingertips. The concepts you will learn going through these exercises apply all over AWS.

This guide takes you through a maturity process from the most basic webpage to an extremely cheap scalable web application. 

Need an idea? Here: Fortune-of-the-Day - Display a random fortune each page load, have a box at the bottom and a submit button to add a new fortune to the random fortune list.

[Account Basics](https://github.com/Andrews-repo/AWS-Project/tree/master/Account%20Basics).

This section was focused around setting up a new account and establishing basic AWS security and account recomendations. It has been automated via cloudformation, but I do need to come back and document how to do some of these things via the CLI.


[Web Hosting Basics](https://github.com/Andrews-repo/AWS-Project/tree/master/Basic%20Web%20Host).

I think "web hosting basics" is pretty vague. This could incorporate reverse proxies, as well as being able to create a VPC network. I am going to assume both, and need to add script to automate both of these. What is done, is the script to automate a basic static website hosted with apache.  I would like to add the automation of an AMI snapshot. 


[Auto Scaling](https://github.com/Andrews-repo/AWS-Project/tree/master/AutoScaling).

I have two scripts that automate the previous website, from an AMI,  into both target target tracking and simple scaling policies from a launchtemplate.

[External Data](https://github.com/Andrews-repo/AWS-Project/tree/master/External%20Data).

This one has been tough, Ive had to learn new technologies. I was stuck for a couple weeks and hadnt worked on an code. Working on solving the issues will be fixed soon. 

[Web Hosting Platform-as-a-Service](https://github.com/Andrews-repo/AWS-Project/tree/master/Web%20Hosting%20-%20Platform%20as%20a%20Service)

I havent started this yet but ive played with some of the technologies in a few other projects. Will be starting ASAP

[Microservices](https://github.com/Andrews-repo/AWS-Project/tree/master/Microservices).

Havent Started.

[Serverless](https://github.com/Andrews-repo/AWS-Project/tree/master/Serverless).

Havent Started. 

[Cost Analysis](https://github.com/Andrews-repo/AWS-Project/tree/master/Cost%20Analysis).

Havent Started. 

Automation

Theres no link to this section as part of the entire point of working with the cloud is automation, and thats all listed here. If I do add this section it will be to showcase some new automation technology I havent done before like ansible. 

[Continuous Delivery](https://github.com/Andrews-repo/AWS-Project/tree/master/CICD).

Havent started, but ive used CodePipeline before so Im brainstorming when i could start implementing it again. 

