FROM node:alpine
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

WORKDIR /app
COPY ./front /app

RUN npm install
RUN npm run build
RUN cp -r /app/build /build