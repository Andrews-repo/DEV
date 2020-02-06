Auto Scaling

* Create an AMI from that VM and put it in an autoscaling group so one VM always exists.

* Put a Elastic Load Balancer infront of that VM and load balance between two Availability Zones (one EC2 in each AZ).

* Checkpoint: You can view a simple HTML page served from both of your EC2 instances. You can turn one off and your website is still accessible.
