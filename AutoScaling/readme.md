Auto Scaling

* Create an AMI from that VM and put it in an autoscaling group so one VM always exists.
  
  Either script above will do this, but doesnt create the AMI itself. Id like to automate the entire process tho.

* Put a Elastic Load Balancer infront of that VM and load balance between two Availability Zones (one EC2 in each AZ).

  Both scripts above creat a load balancer.

* Checkpoint: You can view a simple HTML page served from both of your EC2 instances. You can turn one off and your website is still accessible.

  Done. 
