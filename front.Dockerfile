FROM node:alpine
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /app
COPY ./front /app

RUN npm install --no-cache

CMD npm run build && rm -rf /build/* && cp -r /app/build/* /build