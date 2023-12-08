docker-compose down

docker image rm estoult_fr-orchestrateur

docker build -f front.Dockerfile -t estoult_fr-front .

docker-compose up -d