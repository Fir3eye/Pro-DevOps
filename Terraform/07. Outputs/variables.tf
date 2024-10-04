variable "region_name" {
  description = "Name of the region"
  default     = "ap-south-1"
  type        = string
}

variable "ami_id" {
  description = "value of ami"
  default     = "ami-0ad21ae1d0696ad58"
  type        = string
}

variable "instance_type" {
  description = "value of instance type"
  default     = "t2.micro"
  type        = string
}

variable "count" {
  description = "How many vm will you create"
  default     = 1
  type        = string
}

variable "tag_name" {
  description = " Server name"
  default     = "Test-Server"
  type        = string

}