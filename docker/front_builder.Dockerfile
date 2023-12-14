FROM node
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

# Angular
RUN npm install -g @angular/cli@latest

# Git
RUN apt update && apt install -y git
RUN git config --global credential.helper '!f() { echo "username=oauth2"; echo "password=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"; }; f'
WORKDIR /app
RUN git clone https://github.com/KilianBonnet/estoult.fr.git

# Node
WORKDIR /estoult.fr/front

ENTRYPOINT npm install &&\
    ng build &&\
    rm -rf /build/* &&\
    cp -r /estoult.fr/dist/front/browser/build/* /build