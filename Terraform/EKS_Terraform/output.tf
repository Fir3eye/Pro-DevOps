output "cluster_id" {
  value = aws_eks_cluster.sendevops.id
}

output "node_group_id" {
  value = aws_eks_node_group.sendevops.id
}

output "vpc_id" {
  value = aws_vpc.sendev_vpc.id
}

output "subnet_ids" {
  value = aws_subnet.sendev_subnet[*].id
}