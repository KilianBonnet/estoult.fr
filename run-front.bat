docker container stop estoult_fr-front
docker container rm estoult_fr-front
docker image rm estoult_fr-front

docker build -f front.Dockerfile -t estoult_fr-front .
docker run -d -p 80:80 -p 443:443 --name estoult_fr-front estoult_fr-front
