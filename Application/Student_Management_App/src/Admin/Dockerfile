FROM 525423744334.dkr.ecr.ca-central-1.amazonaws.com/amazonlinux2023:latest

RUN dnf update -y && dnf install -y python3 python3-pip && dnf clean all 

WORKDIR /app
COPY . .

RUN pip install --no-cache-dir -r requirements.txt
CMD [ "python3", "app.py" ]
