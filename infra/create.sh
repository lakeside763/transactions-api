# 1. Create the kubernetes cluster
  eksctl create cluster -f infra/eksctl/cluster.yaml

  chmod -R u+x transactions-api

# 2. Getting NodeGroup IAM Role from kubernetes cluster
  # nodegroup_iam_role=$(aws cloudformation list-exports --query "Exports[?contains(Name, 'nodegroup-deel::InstanceRoleARN')].Value" --output text | xargs | cut -d "/" -f 2)
  nodegroup_iam_role=$(aws eks describe-nodegroup --cluster-name deel-eks  --nodegroup-name deel-eks-node-groups --query nodegroup.nodeRole --output text | xargs | cut -d "/" -f 2)


# 3. Installing Load Balancer Controller
  ( cd ./infra/k8s-tooling/load-balancer-controller && ./create.sh )
  aws_lb_controller_policy=$(aws cloudformation describe-stacks --stack-name aws-load-balancer-iam-policy --query "Stacks[*].Outputs[?OutputKey=='IamPolicyArn'].OutputValue" --output text | xargs)
  aws iam attach-role-policy --role-name ${nodegroup_iam_role} --policy-arn ${aws_lb_controller_policy}

# 4. Create SSL Certificate in ACM
  ( cd ./infra/cloudformation/ssl-certificate && ./create.sh)

# 5. Installing ExternalDNS
  ( cd ./infra/k8s-tooling/external-dns && ./create.sh)
  aws iam attach-role-policy --role-name ${nodegroup_iam_role} --policy-arn arn:aws:iam::aws:policy/AmazonRoute53FullAccess

# 6. Installing the application
  ( cd ./infra/app/helm && ./create.sh)

# 7. Create the VPC CNI Addon
  aws eks create-addon --addon-name vpc-cni --cluster-name deel-eks

echo "**********deployment**********"
kubeclt get deployments -n development
echo "******************************"

echo "**********deployment**********"
kubeclt get services -n development
echo "******************************"

echo "**********deployment**********"
kubeclt get pods -n kube-system
echo "******************************"