FROM node:alpine AS builder
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /app
COPY ./front /app

RUN npm install
RUN npm run build

FROM nginx
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /app

# Coping react build to app front folder
COPY --from=builder /app/build /var/www

# nginx config file
COPY ./docker-helper/nginx-config /etc/nginx/conf.d/default.conf

# Giving execution permission to ssh-cerification script
COPY ./docker-helper/start-nginx-ssh.sh /start-nginx-ssh.sh
RUN chmod +x /start-nginx-ssh.sh

CMD ["/start-nginx-ssh.sh"]

EXPOSE 80 443