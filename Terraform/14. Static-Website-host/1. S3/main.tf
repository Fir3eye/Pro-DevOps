terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
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

#Generate random value
resource "random_id" "random-value" {
  byte_length = 8
}

resource "aws_s3_bucket" "test-bucket" {
  bucket = "bucket342342342${random_id.random-value.hex}"  # Assign random value to s3 bucket
}

# Copy file on s3 bucket
resource "aws_s3_object" "copy_object" {
  source = "./index.html"
  bucket = aws_s3_bucket.test-bucket.bucket
  key    = "myindex.html"

}