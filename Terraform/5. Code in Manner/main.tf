resource "aws_instance" "demo" {
    ami = var.region
    instance_type = var.instance_type
    count = var.no_of_instance
    tags = {
      Name = var.tags_name 
    }
  
}
