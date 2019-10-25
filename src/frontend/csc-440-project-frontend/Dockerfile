FROM nginx:latest

RUN mkdir /static

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./build /static

EXPOSE 80
