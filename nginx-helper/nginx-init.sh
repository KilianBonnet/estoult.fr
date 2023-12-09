#!/bin/bash

# Check if /etc/letsencrypt/live/www.estoult.fr is empty
if [ -z "$(ls -A /etc/letsencrypt/live/www.estoult.fr)" ]; then
  certbot certonly --standalone --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d www.estoult.fr --redirect --keep-until-expiring
  rm /etc/cron.d/certbot-renew
else
  echo www.estoult.fr will use cronjob autorenew
  certbot renew --nginx --dry-run
fi



# Check if /etc/letsencrypt/live/estoult.fr is empty
# if [ -z "$(ls -A /etc/letsencrypt/live/estoult.fr)" ]; then
#   certbot certonly --standalone --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d estoult.fr --redirect --keep-until-expiring
#   rm /etc/cron.d/certbot-renew
# else
#   echo estoult.fr will use cronjob autorenew
# fi



# Start Nginx
nginx -g "daemon off;"
