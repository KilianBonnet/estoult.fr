#!/bin/bash

# Check if /etc/letsencrypt/live/www.estoult.fr is empty
if [ -z "$(ls -A /etc/letsencrypt/live/www.estoult.fr)" ];
then certbot certonly --standalone --no-autorenew --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d www.estoult.fr --redirect --keep-until-expiring
fi



# Check if /etc/letsencrypt/live/estoult.fr is empty
if [ -z "$(ls -A /etc/letsencrypt/live/estoult.fr)" ];
then certbot certonly --standalone --no-autorenew --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d estoult.fr --redirect --keep-until-expiring
fi

echo estoult.fr will use cronjob autorenew
touch /dev/certbot_logs
echo "0 0 * * 0 root certbot renew --nginx >> /dev/certbot_logs" | crontab -
crontab -l
service cron restart


# Start Nginx
nginx -g "daemon off;"
