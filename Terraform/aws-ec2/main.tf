resource "aws_instance" "ubuntu" {
    count = 2
    ami = var.ami_id
    instance_type = var.instance_type

    tags = {
      Name = "test-server"
    }
}

output "instance_id" {
    value = aws_instance.ubuntu[*].id
}

output "instance_public_ip" {
    value = aws_instance.ubuntu[*].public_ip
}
