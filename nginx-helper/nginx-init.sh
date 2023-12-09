#!/bin/bash

# Check if /etc/letsencrypt/live/www.estoult.fr is empty
if [ -z "$(ls -A /etc/letsencrypt/live/www.estoult.fr)" ]; then
  certbot certonly --standalone --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d www.estoult.fr --redirect --keep-until-expiring
  rm /etc/cron.d/certbot-renew
fi

# Start Nginx
nginx -g "daemon off;"
