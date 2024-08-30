terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.64.0"
    }
    random = {
      source = "hashicorp/random"
      version = "3.6.2"
    }
  }
}

provider "aws" {
    region = "ap-south-1"
}

# Create Random value
resource "random_id" "random-value" {
    byte_length = 6
}

resource "aws_s3_bucket" "create-bucket" {
    bucket = "my-app-bucket-${ random_id.random-value.hex }"
}

