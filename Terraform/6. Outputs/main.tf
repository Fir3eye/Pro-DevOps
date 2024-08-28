resource "aws_instance" "demo" {
  ami           = var.ami_id
  instance_type = var.instance_type
  count         = var.count

  tags = {
    Name = var.count
  }
}

output "instance_public_ip" {
  value = aws_instance.demo.public_ip
}