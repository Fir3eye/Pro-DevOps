# Installation Instructions
## Step 1: Install Docker
- Install Docker:
```
sudo apt-get install docker.io
```
- Add your user to the Docker group to run Docker without sudo:
```
sudo usermod -aG docker $USER && newgrp docker
```

## Step 2: Install Minikube
- Download the Minikube binary:
```
wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo cp minikube-linux-amd64 /usr/local/bin/minikube
sudo chmod 755 /usr/local/bin/minikube
```
- Start Minikube and Check Status:
```
minikube start
minikube status
```
## Step 3: Install Kubectl

```
sudo curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
sudo chmod +x kubectl
sudo mv kubectl /usr/local/bin/kubectl
```

## Step 4: Install ArgoCD
```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
- Retrieve the initial admin password for ArgoCD:
```
kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
## Step 5: Deploy an App on ArgoCD
Deploy your first application using ```deployment.yaml```.
