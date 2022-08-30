## Set up AWS EMR - Elastice Map Reduce 
#### Prerequisite : AWS account, AWS key-value pair .pem file 
- On AWS EMR console, create cluster 
- In Software Configuration : Choose Spark 
- Enable SSH gateway and add whitelist IP to connect EMR cluster from local machine. 


## Set up AWS S3 
- Upload Spak application on AWS S3. 
- Upload data 

CLI commands: 
- Connect AWS EMR cluster : `ssh -i Instance1.pem hadoop@ec2-13-57-6-240.us-west-1.compute.amazonaws.com`
- Download Spark application from S3 : `aws s3 cp s3://daas1/testing_sparkApplication.py .`
- Run Spark Application : `spark-submit testing_sparkApplication.py --data_source s3://daas1/final_data_transaction.csv` [Note: IAM policies for Elastic Map reduce should be granted for the user] 
