helm repo add eks https://aws.github.io/eks-charts

helm upgrade --install \
  -n development \
  --set clusterName=deel-eks \
  --set serviceAccount.create=true \
  aws-load-balancer-controller eks/aws-load-balancer-controller

aws cloudformation deploy \
  --stack-name aws-load-balancer-iam-policy \
  --template-file iam-policy.yaml \
  --capabilities CAPABILITY_IAM