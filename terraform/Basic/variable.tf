variable "My_ami_id" {
    default = "ami-0dd67d541aa70c8b9"
    type = string
}

variable "aws_instance_type" {
    default = "t3.micro"
    type = string
  
}

variable "aws_storage_set" {
   default = 12
    type = number
}

variable "My_instance_name" {
    default = "MyFirstInstance with python"
    type = string
}