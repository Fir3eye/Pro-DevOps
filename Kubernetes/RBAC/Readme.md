# How to Use
### Kubernetes RBAC (Role-Based Access Control) is crucial for managing who can do what within your cluster. It involves four key objects:

- Role: Defines permissions within a specific namespace.
- Cluster Role: Like a Role, but applicable across the entire cluster.
- Role Binding: Ties a Role to a user or group within a specific namespace.
- Cluster Role Binding: Ties a Cluster Role to a user or group cluster-wide.
Mastering these objects helps in securing and efficiently managing access to your Kubernetes resources! 💼
## Role
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
    namespace: default
    name: pod-reader
    rules:
    - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "watch", "list"]

## RoleBinding
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
    name: read-pods
    namespace: default
    subjects:
    - kind: User  # user/group/service account --> you can define 
    name: jack
    apiGroup: rbac.authorization.k8s.io
    roleRef:
    kind: Role
    name: pod-reader # name of role
    apiGroup: rbac.authorization.k8s.io

## How to check
    kubectl get role
    kubectl get rolebinding
    kubectl auth can-i get pod --as jack 

- Ans will give in form of yes/no
- yes --> you have get, watch and list permissions.
- no --> you do not have get, watch, and list permissions.
    

---

## ClusterRole
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRole
    metadata:
    name: secret-reader
    rules:
    - apiGroups: [""]
    resources: ["secrets"] #
    verbs: ["get", "watch", "list"]

## ClusterRoleBinding - specific ns
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
    name: read-secret
    namespace: development # for specific ns
    subjects:
    - kind: User  # user/group/service account --> you can define 
    name: dev
    apiGroup: rbac.authorization.k8s.io
    roleRef:
    kind: ClusterRole
    name: secret-reader # name of cluster-role
    apiGroup: rbac.authorization.k8s.io

## ClusterRoleBinding - for all ns

    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
    name: read-secret-global
    #namespace: development # for specific ns
    subjects:
    - kind: User  # user/group/service account --> you can define 
    name: sid
    apiGroup: rbac.authorization.k8s.io
    roleRef:
    kind: ClusterRole
    name: secret-reader # name of cluster-role
    apiGroup: rbac.authorization.k8s.io

## How to check
    kubectl get clusterrole
    kubectl get clusterrolebinding
    kubectl auth can-i get secret --as sid -A 

- A --> it will showing result of all ns 
- yes --> you have get, watch and list permissions.
- no --> you do not have get, watch, and list permissions.

