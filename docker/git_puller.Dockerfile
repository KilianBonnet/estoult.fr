FROM ubuntu
LABEL maintainer='Kilian Bonnet <kilian.bonnet@estoult.fr>'

# Git
RUN apt update && apt install -y git
RUN git config --global credential.helper '!f() { echo "username=oauth2"; echo "password=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"; }; f'

RUN git clone https://github.com/KilianBonnet/estoult.fr.git
WORKDIR /estoult.fr

EXPOSE 8080

CMD git pull