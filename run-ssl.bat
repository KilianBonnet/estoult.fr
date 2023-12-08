docker container stop estoult_fr-ssl
docker container rm estoult_fr-ssl
docker image rm estoult_fr-ssl

docker build -f ssl.Dockerfile -t estoult_fr-ssl .
docker run -d -p 80:80 -p 443:443 --name estoult_fr-ssl estoult_fr-ssl
