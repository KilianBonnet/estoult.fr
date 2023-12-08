#!/bin/bash

# Running nginx in background
nginx -g "daemon off;" &

# Waiting nginx soit to be ready
until [ "$(curl -I -s http://localhost | head -n 1)" != "HTTP/1.1 200 OK" ]; do
  sleep 1
done

# Exécuter la commande souhaitée (par exemple, une commande spécifique à votre application)
echo "NGINX is ready."
certbot --nginx --agree-tos --no-eff-email --email kilian.bonnet@estoult.fr -d estoult.fr --redirect --keep-until-expiring

# Keeping container alive
tail -f /dev/null
