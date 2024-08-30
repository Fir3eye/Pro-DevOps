provider "tls" {}

resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}


resource "local_file" "private_key" {
  content         = tls_private_key.ssh_key.private_key_pem
  filename        = "private_key.pem"
  file_permission = "0600"
}

resource "aws_key_pair" "generated_key" {
  key_name   = "example-key"
  public_key = tls_private_key.ssh_key.public_key_openssh

}

resource "aws_instance" "demo-server" {
  ami           = "ami-0ad21ae1d0696ad58"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.generated_key.key_name
}

resource "aws_security_group" "allow_tls" {
  name        = "my-sg"
  description = "Allow TLS inbound traffic"
  vpc_id      = "vpc-0271007e93cae0e0d"

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
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

  tags = {
    Name = "my-sg"
  }
}

resource "aws_network_interface_sg_attachment" "sg_attachment" {
  security_group_id    = aws_security_group.allow_tls.id
  network_interface_id = aws_instance.demo-server.primary_network_interface_id
}