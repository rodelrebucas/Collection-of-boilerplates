package main

import (
	"entangle/server/env"
	"entangle/server/route"

	// "github.com/centrifugal/gocent"
	_ "entangle/server/docs"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
)

var environ *env.Var = env.LoadEnv()

// @title Entangle API docs
// @version 0.1.0
// @description Backend server for the entangle app
// @tag.name Auth
// @tag.description user authentication operations
// @termsOfService http://swagger.io/terms/
// @BasePath /
func main() {
	// TODO
	// c := gocent.New(gocent.Config{
	// 	Addr: "http://localhost:8000",
	// 	Key:  "<API key>",
	// })

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())

	if environ.Env == "development" {
		e.GET("/swagger/*", echoSwagger.WrapHandler)
	}

	route.Auth(e, environ.Secret)
	e.Logger.Fatal(e.Start(":" + environ.Port))
}
