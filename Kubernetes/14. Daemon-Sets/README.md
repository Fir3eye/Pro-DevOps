# Practical Implementation:-
### Daemon Sets
- A `DaemonSet` is a Kubernetes resource that ensures a specific `Pod` runs on all or a selected group of nodes in a cluster. 
It is primarily used for deploying background services that need to operate on every node, such as:

    - Logging agents: Collect logs from all nodes.
    - Monitoring agents: Gather metrics or health information.
    - Network proxies: Manage network traffic at the node level.
## Setup Kind Cluster
- You can find the kind configuration file here: [kind.yaml](Kind-Cluster-Setup/kind.yaml)
- You can find the kind configuration file here: [README.md](Kind-Cluster-Setup/README.md)


## Create the DaemonSet nginx-daemonset.yaml:
```
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nginx-daemonset
  labels:
    app: nginx
spec:
  selector:
    matchLabels:
      name: nginx
  template:
    metadata:
      labels:
        name: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```
###  Apply the update DaemonSet
```
kubectl apply -f nginx-daemonset.yaml

```
### Verifying the Deployment
```
kubectl get pods -o wide
```
