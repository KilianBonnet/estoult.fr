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
RUN rm /etc/nginx/conf.d/default
COPY ./nginx-config/default /etc/nginx/sites-enabled

# Installing Certbot 
RUN apt update && apt install -y certbot python3-certbot-nginx

# Obtaining SSL cerificate from Certbot
RUN nginx -g daemon on & certbot --nginx --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d estoult.fr --redirect

EXPOSE 80 443