FROM nginx
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

# Installing Certbot 
RUN apt update && apt install -y certbot python3-certbot-nginx
RUN certbot certonly --standalone --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d estoult.fr --redirect --keep-until-expiring 

# nginx config file
COPY ./nginx-helper/nginx-config /etc/nginx/conf.d/default.conf

EXPOSE 80 443