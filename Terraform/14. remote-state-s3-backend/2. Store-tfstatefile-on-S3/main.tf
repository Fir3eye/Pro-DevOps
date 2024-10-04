terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.64.0"
    }
  }
  backend "s3" {
    bucket = "backend-store-bucket343234s"
    key    = "TF-State/terraform.tfstate"
    region = "ap-south-1"
  }
}

provider "aws" {
  region = "ap-south-1"
}

# Create EC2 Instance
resource "aws_instance" "my-instance" {
  ami           = "ami-0ad21ae1d0696ad58"
  instance_type = "t2.micro"
}
