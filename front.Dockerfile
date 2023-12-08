FROM node:alpine AS builder
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /app
COPY ./front /app

RUN npm install
RUN npm run build

FROM ubuntu:20.04
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /app

# Coping react build to app front folder
COPY --from=builder /app/build /var/www

# nginx install
RUN apt update && apt install -y nginx

# Coping nginx config
RUN rm /etc/nginx/sites-enabled/default
COPY ./nginx-config/default /etc/nginx/sites-enabled

# certbot install
RUN apt update && apt install -y certbot python3-certbot-nginx
RUN certbot certonly --nginx --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d estoult.fr

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]