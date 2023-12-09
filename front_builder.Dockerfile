FROM node
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

# Git
RUN apt update && apt install -y git
RUN git config --global credential.helper '!f() { echo "username=oauth2"; echo "password=${GITHUB_TOKEN}"; }; f'
WORKDIR /app
RUN git clone https://github.com/KilianBonnet/estoult.fr.git

# Node
WORKDIR /app/estoult.fr/front
RUN npm install

ENTRYPOINT git pull &&\
    npm install &&\
    npm run build &&\
    rm -rf /build/* &&\
    cp -r /app/estoult.fr/front/build/* /build