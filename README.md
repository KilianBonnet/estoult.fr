# estoult.fr
My website

## Getting started
### Dependencies  
Before installing
```sh
sudo apt update
```

- Git `sudo apt install git`
- NodeJS `sudo apt install nodejs`
- npm `sudo apt install npm`
- [Docker](https://docs.docker.com/engine/install/ubuntu/)

### nginx
#### Build the docker image
```sh
./build-nginx.sh 
```

### front_builder
#### Build the front_builder image
```sh
./build-front_builder.sh 
```

### github-webhooks  
**IMPORTANT :** Port 8000 is used to run the server. Be sure to configure the vps firewall to authorize requests ont port 8000.

```sh
cd github-webhooks
npm install 
npm start &
```