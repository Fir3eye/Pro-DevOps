# Prometheus Grafana dashboard for Kubernetes monitoring

This guide will walk you through the steps to create a Kubernetes cluster on AWS using `eksctl`, and set up Prometheus and Grafana for monitoring using Helm.

## Requirements

- [AWS CLI](https://aws.amazon.com/cli/)
- [EKSCTL](https://eksctl.io/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [HELM](https://helm.sh/docs/intro/install/)
## Installation and Configuration Guide for AWS CLI, Helm, and Kubectl
### Download and Install AWS CLI
```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```
---
### Configure AWS CLI
```
aws configure
```
You will be prompted to enter:
- AWS Access Key ID
- AWS Secret Access Key
- Default region name (e.g., us-east-1)
- Default output format (e.g., json)

---
### Install Kubectl 
```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```
---
### Download and Install Helm

```
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```
### Verify helm version 
```
helm version
```

---

## Step 1: Create Kubernetes Cluster in AWS Using `eksctl`

```
eksctl create cluster \
    --name test-cluster-1 \
    --version 1.22 \
    --region ap-south-1 \
    --nodegroup-name worker-nodes \
    --node-type t2.large \
    --nodes 2 \
    --nodes-min 2 \
    --nodes-max 3
```

## Step 2: Update Kubeconfig File

```
aws eks update-kubeconfig --name test-cluster-1
```

## Step 3: Set Up Kubernetes Metrics Server
- Install the Kubernetes metrics server, which will communicate with the Kubernetes cluster and send metrics.

```
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

```
- Check the metrics server status:

```
kubectl get deployment metrics-server -n kube-system
kubectl get pods -n kube-system

```
## Step 4: Add Helm Repositories

```
Add the necessary Helm repositories for Prometheus and Grafana:
```

## Step 5: Install Prometheus
1. Create a namespace for Prometheus:
```
kubectl create namespace prometheus

```
2. Install Prometheus using Helm:
```
helm install prometheus prometheus-community/prometheus \
    --namespace prometheus \
    --set alertmanager.persistentVolume.storageClass="gp2" \
    --set server.persistentVolume.storageClass="gp2"
```
3. Verify Prometheus installation:
```
kubectl get all -n prometheus
```
4. Access the Prometheus dashboard:
```
kubectl port-forward deployment/prometheus-server 9090:9090 -n prometheus

```
## Step 6: Install Grafana
#### Create a Datasource YAML File
- Create a prometheus-datasource.yaml file with the following content:
```
datasources:
  datasources.yaml:
    apiVersion: 1
    datasources:
    - name: Prometheus
      type: prometheus
      url: http://prometheus-server.prometheus.svc.cluster.local
      access: proxy
      isDefault: true
```
### Install Grafana
1. Create a namespace for Grafana
```
kubectl create namespace grafana
```

2. Install Grafana using Helm with the datasource configuration
```
helm install grafana grafana/grafana \
    --namespace grafana \
    --set persistence.storageClassName="gp2" \
    --set persistence.enabled=true \
    --set adminPassword='EKS!sAWSome' \
    --values prometheus-datasource.yaml \
    --set service.type=LoadBalancer
```

3. verify Grafana Installation:

```
kubectl get all -n grafana
```

4. Retrieve the public IP of the Grafana Kubernetes service:

```
kubectl get service -n grafana
```
---
You can now access Grafana via the public IP address provided by the kubectl get service command.


#### 
This `README.md` file provides a clear, step-by-step guide for setting up a Kubernetes cluster with Prometheus and Grafana on AWS, tailored to your specific requirements.


