FROM certbot/certbot:latest
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

VOLUME /etc/letsencrypt

RUN certbot certonly --standalone --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d estoult.fr --redirect --keep-until-expiring

EXPOSE 80 443

# Keep container alive
ENTRYPOINT ["tail", "-f", "/dev/null"]