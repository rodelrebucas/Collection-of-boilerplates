package main

import (
	"sample/server/env"
	"sample/server/route"

	// "github.com/centrifugal/gocent"
	_ "sample/server/docs"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
)

var environ *env.Var = env.LoadEnv()

// @title sample API docs
// @version 0.1.0
// @description Backend server for the sample app
// @tag.name Auth
// @tag.description user authentication operations
// @termsOfService http://swagger.io/terms/
// @BasePath /
func main() {
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
