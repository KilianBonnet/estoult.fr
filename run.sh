docker-compose down

docker image rm estoult_fr-front

docker build -f front.Dockerfile -t estoult_fr-front .

docker-compose up -d