terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.64.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

#Create Bucket
resource "aws_s3_bucket" "demo-bucket" {
  bucket = "backend-store-bucket343234s"
}
