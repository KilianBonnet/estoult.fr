FROM node
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /estoult.fr/discord-chat
EXPOSE 8000
ENTRYPOINT npm install && npm start