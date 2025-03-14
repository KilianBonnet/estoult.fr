FROM node:18
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

# Angular
RUN npm install -g @angular/cli@latest

WORKDIR /estoult.fr/front

ENTRYPOINT npm install &&\
    ng build &&\
    rm -rf /build/* &&\
    cp -r /estoult.fr/front/dist/front/browser/* /build