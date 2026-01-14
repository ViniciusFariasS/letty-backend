

//derrubar docker
docker compose down -v

//buildar docker
docker compose build --no-cache

//subir docker
docker compose up -d


//subir banco de dados localhost
psql -h localhost -U letty -d letty
