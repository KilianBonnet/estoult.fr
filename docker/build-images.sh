docker compose down

# front_builder
docker container stop estoult_fr-front_builder
docker container rm estoult_fr-front_builder
docker image rm estoult_fr-front_builder

# git_puller
docker container stop estoult_fr-git_puller
docker container rm estoult_fr-git_puller
docker image rm estoult_fr-git_puller

# nginx
docker container stop estoult_fr-nginx
docker container rm estoult_fr-nginx
docker image rm estoult_fr-nginx

# discord-chat
docker container stop estoult_fr-discord_chat
docker container rm estoult_fr-discord_chat
docker image rm estoult_fr-discord_chat

cd ..
docker build -f ./docker/front_builder.Dockerfile -t estoult_fr-front_builder .
docker build -f ./docker/git_puller.Dockerfile -t estoult_fr-git_puller .
docker build -f ./docker/nginx.Dockerfile -t estoult_fr-nginx .
docker build -f ./docker/discord_chat.Dockerfile -t estoult_fr-discord_chat .