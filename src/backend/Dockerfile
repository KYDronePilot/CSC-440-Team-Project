FROM ubuntu:19.04

RUN mkdir /src
COPY csc_440_project_backend /src

RUN apt-get update && apt-get install -y \
    python3.7 python3-pip

RUN /usr/bin/python3.7 -m pip install -r /src/requirements.txt

EXPOSE 8000

ENTRYPOINT ["/usr/bin/python3.7", "/src/manage.py", "runserver", "8000"]