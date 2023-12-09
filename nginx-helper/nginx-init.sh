#!/bin/bash

# Check if /etc/letsencrypt/live/www.estoult.fr is empty
if [ -z "$(ls -A /etc/letsencrypt/live/www.estoult.fr)" ]; then
  echo "Empty /etc/letsencrypt/live/www.estoult.fr directory, running certbot certonly..."
  certbot certonly --standalone --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d www.estoult.fr --redirect --keep-until-expiring
fi

# Start Nginx
nginx -g "daemon off;"
