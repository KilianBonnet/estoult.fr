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

# Coping nginx config
COPY ./nginx-config/default /etc/nginx/conf.d/default.conf

# Installing Certbot 
RUN apt update && apt install -y certbot python3-certbot-nginx

CMD certbot renew --dry-run --non-interactive --nginx --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d estoult.fr --redirect --keep-until-expiring

EXPOSE 80 443