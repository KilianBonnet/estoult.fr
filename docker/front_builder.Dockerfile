FROM node
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /estoult.fr/discord-chat

ENTRYPOINT npm install && npm start