FROM nginx:latest

RUN mkdir -p /static/admin-static

COPY ./build /static
COPY ./static /static/admin-static

EXPOSE 80
