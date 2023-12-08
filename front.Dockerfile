FROM node:alpine

LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /app
COPY ./front /app

RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 3000

CMD serve -s build