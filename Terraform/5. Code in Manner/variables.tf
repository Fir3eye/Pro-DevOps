variable "region" {
    description = "value of region"
    default = "ap-south-1"
    type = string
}

variable "ami_id" {
    description = "value of ami"
    default = "ami-0ad21ae1d0696ad58"
    type = string
}

variable "instance_type" {
    description = "value of instance type"
    default = "t2.micro"
    type = string
}

variable "tags_name" {
    description = "Server Name"
    default = "Test.server"
    type = string
}

variable "no_of_instance" {
    description = "How many instance do you want to create"
    default = 1
    type = string
}

