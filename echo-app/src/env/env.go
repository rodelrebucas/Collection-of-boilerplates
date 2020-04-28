package env

import (
	"os"
)

// Var defines environment variables
type Var struct {
	Port, Env, Secret string
}

// LoadEnv loads all environment variables in .env file
func LoadEnv() *Var {
	// Load env variables when in development
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal(err)
	// 	log.Fatal("Error loading .env file")
	// }

	port := os.Getenv("PORT")
	env := os.Getenv("ENV")
	secret := os.Getenv("SECRET_KEY")

	return &Var{
		Port:   port,
		Env:    env,
		Secret: secret,
	}
}
