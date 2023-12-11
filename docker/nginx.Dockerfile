FROM nginx
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

# Installing certbot & cron
RUN apt update && apt install -y certbot python3-certbot-nginx cron

# nginx config file
RUN rm /etc/nginx/conf.d/default.conf
RUN ln -s /estoult.fr/nginx/nginx.config /etc/nginx/conf.d/default.conf

# Container startup script
COPY /estoult.fr/nginx/nginx-init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

EXPOSE 80 443

ENTRYPOINT ["sh", "/usr/local/bin/init.sh"]