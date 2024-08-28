variable "instance_type" {
    description     = "Value of instance type"
    default         = "t2.micro"
    type            = string
  
}
variable "region" {
    description     = "Value of region"
    default         = "ap-south-1"
    type            = string
}

variable "ami_id" {
    description     = "value of ami"
    default         = "ami-0ad21ae1d0696ad58"
    type            = string
}
