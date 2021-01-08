FROM nginx:latest


WORKDIR /etc/nginx/

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf 

RUN mkdir -p /etc/nginx/logs && touch /etc/nginx/logs/access.log

COPY ./nginx_default /etc/nginx

EXPOSE 80
