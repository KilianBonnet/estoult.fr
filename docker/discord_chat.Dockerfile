FROM node
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

# Angular
RUN npm install -g @angular/cli@latest

EXPOSE 8000

WORKDIR /estoult.fr/front

ENTRYPOINT npm install &&\
    ng build &&\
    rm -rf /build/* &&\
    cp -r /estoult.fr/dist/front/browser/build/* /build