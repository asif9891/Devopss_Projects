resource "aws_key_pair" "deployer" {
   key_name = "DeployerKey"
   public_key = file("./deployer.pub")
}

resource "aws_default_vpc" "MyVPC" {
  
}

resource "aws_security_group" "MySecurityGroup" {
  name        = "AllowSSH"
  description = "Allow SSH inbound traffic"
  vpc_id      = aws_default_vpc.MyVPC.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
}

resource "aws_instance" "ec2_instance"{
    key_name = aws_key_pair.deployer.key_name
    ami = var.My_ami_id
    instance_type = var.aws_instance_type
    vpc_security_group_ids = [aws_security_group.MySecurityGroup.id]

    root_block_device {
        volume_size = var.aws_storage_set
        volume_type = "gp3"
    }

    tags = {
        Name = var.My_instance_name
    }
}