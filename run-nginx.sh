docker container stop estoult_fr-nginx
docker container rm estoult_fr-nginx
docker image rm estoult_fr-nginx

docker build -f nginx.Dockerfile -t estoult_fr-nginx .
docker compose up -d