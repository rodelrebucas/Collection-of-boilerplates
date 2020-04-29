### echo-app

### Documentation

Add docs dependencies:

`go get github.com/swaggo/swag/cmd/swag`

`go get -u github.com/swaggo/echo-swagger`

Generate/update docs with: `./bin/swag init -g ./src/sample/server.go -o ./src/sample/docs`

Run by running the app Api docs: `http://localhost:8000/swagger/index.html`
