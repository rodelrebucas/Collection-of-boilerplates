package main

import (
	"os"
	"sample/server/env"
	"sample/server/route"
	_ "sample/server/docs"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
)

// @title sample API docs
// @version 0.1.0
// @description Backend server for the sample app
// @tag.name Auth
// @tag.description user authentication operations
// @termsOfService http://swagger.io/terms/
// @BasePath /
func main() {
	env.LoadEnv()
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	if os.Getenv("ENV") == "development" {
		e.GET("/swagger/*", echoSwagger.WrapHandler)
	}
	// Routes
	route.Register(e)
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}
