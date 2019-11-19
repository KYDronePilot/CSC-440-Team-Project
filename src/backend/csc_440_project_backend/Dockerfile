FROM ubuntu:19.04

RUN mkdir /src

RUN apt-get update && apt-get install -y \
    python3.7 python3-pip

COPY requirements.txt /tmp/requirements.txt
RUN /usr/bin/python3.7 -m pip install -r /tmp/requirements.txt

COPY . /src

EXPOSE 8000

ENTRYPOINT ["/src/entrypoint.sh"]
