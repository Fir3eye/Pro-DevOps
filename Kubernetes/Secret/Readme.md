# Types of Secret
    - Generic Secret
    - Docker-Registry Secret
    - TLS Secret

# Create Secret Using Imperative Method
## Generic Secret
    kubectl create secret generic db-secret --from-literal=username=dbuser \
    --from-literal=password=343jds1

## Attach Generic Secret on Pods
### secret-1.yaml
    apiVersion: v1
    kind: Pod
    metadata:
    name: secret-demo-1
    spec:
    containers:
    - name: demo-container
        image: nginx
        env:
        - name: username
        valueFrom:
            secretKeyRef:
            name: db-secret
            key: username
        - name: password
        valueFrom:
            secretKeyRef:
            name: db-secret
            key: password
### Commands
    kubectl get secret
    kubectl describe secret <secret-name>
    kubectl get pods
    kubectl exec -it <pod-name> -- printenv
---
## Step 1: Generate the CA Private Key (cakey.pem)
    openssl genrsa -out cakey.pem 4096
## Step 2: Generate the CA Certificate (cacrt.pem)
    openssl req -x509 -new -nodes -key cakey.pem -sha256 -days 3650 -out cacrt.pem

## Docker-Registry Secret
    kubectl create secret docker-registry docker-secret \
    --docker-email=example@gmail.com \
    --docker-username=fir3eye \
    --docker-password=pass1232 \
    --docker-server=my-registry.example:5000
---

## Attach Generic Secret on Pods
### secret-1.yaml
    apiVersion: v1
    kind: Pod
    metadata:
    name: secret-demo-2
    spec:
    containers:
    - name: demo-container
        image: nginx
        envFrom
        - secretRef:
            name: docker-secret

---
## TLS Secret
    kubectl create secret tls my-tls-secret \
    --cert=/home/fir3/k8/secret/data/cacrt.pem \
    --key=/home/fir3/k8/secret/data/cakey.pem

## Attach Generic Secret on Pods
### secret-1.yaml
    apiVersion: v1
    kind: Pod
    metadata:
    name: secret-demo-3
    spec:
    containers:
    - name: demo-container
        image: nginx
        volumeMounts:
        - name: data
        mountPath: /etc/cert-data

    volumes:
    - name: data
        secret:
        secretName: my-tls-secret



### Command
    kubectl get secret
    kubectl describe secret my-tls-secret
    kubectl get pods
    kubectl exec -it <pod-name> -- printenv

