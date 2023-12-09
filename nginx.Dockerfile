FROM nginx
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

# Installing Certbot 
RUN apt update && apt install -y certbot python3-certbot-nginx

# nginx config file
COPY ./nginx-helper/nginx-config /etc/nginx/conf.d/default.conf

# Container initialization script
COPY ./nginx-helper/nginx-init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Autorenew Cron job configuration file
COPY ./nginx-helper/certbot-renew-cronjob /etc/cron.d/certbot-renew
RUN chmod 0644 /etc/cron.d/certbot-renew

EXPOSE 80 443

ENTRYPOINT ["sh", "/usr/local/bin/init.sh"]