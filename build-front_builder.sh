docker container stop estoult_fr-front_builder
docker container rm estoult_fr-front_builder
docker image rm estoult_fr-front_builder

docker build -f front_builder.Dockerfile -t estoult_fr-front_builder .