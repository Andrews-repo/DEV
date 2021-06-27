Web Hosting Platform-as-a-Service

* [Retire that simple website and re-deploy it on Elastic Beanstalk.](https://github.com/Andrews-repo/AWS-Project/tree/master/Web%20Hosting%20-%20Platform%20as%20a%20Service/FortuneSite-elasticbeanstalk) - uses hidden ".ebextensions" folder to set environment variables. 
* [Create a S3 Static Website Bucket, upload some sample static pages/files/images. Add those assets to your Elastic Beanstalk website.](https://github.com/Andrews-repo/AWS-Project/tree/master/Web%20Hosting%20-%20Platform%20as%20a%20Service/FortuneSite-elasticbeanstalk-s3assets) - I want to go a little further with this: s3proxy.
* Register a domain (or re-use and existing one). Set Route53 as the Nameservers and use Route53 for DNS. Make www.yourdomain.com go to your Elastic Beanstalk. Make static.yourdomain.com serve data from the S3 bucket.
* Enable SSL for your Static S3 Website. This isn't exactly trivial. (Hint: CloudFront + ACM)
* Enable SSL for your Elastic Beanstalk Website.
* Checkpoint: Your HA/AutoScaled website now serves all data over HTTPS. The same as before, except you don't have to manage the servers, web server software, website deployment, or the load balancer.
