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
front_builder is used to build the react front. By running the container, it will pull the main branch, run `npm run build` and transfere the `./build` folder to nginx via `build` volume.

#### Build the front_builder image
```sh
./build-front_builder.sh 
```

### github-webhooks  
**IMPORTANT :** Port 8000 is used to run the server. Be sure to configure the vps firewall to authorize requests ont port 8000.

#### Run the github-webhooks server

```sh
cd github-webhooks
npm install 
nohup npm start &
```

You can rertieve logs from the last push in `.nohup.out `

#### Stop the github-webhooks server
```sh
pkill node
```