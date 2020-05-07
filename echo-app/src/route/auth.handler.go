package route

import (
	"os"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

// Auth godoc
// @tags Auth
// @Summary Creates token for subscribers
// @Description TODO
// @Accept  json
// @Produce  json
// @Param id formData string true "id of connecting client"
// @Header 200 {string} Token
// @Router /authenticate [post]
// AuthenticateHandler - handles /authenticate route
func AuthenticateHandler(c echo.Context) (err error) {
		user := createUser()
		if err = c.Bind(user); err != nil {
			return
		}
		if err = user.validate(); err != nil {
			var errs string
			for _, errss := range err.(validator.ValidationErrors) {
				errs = errs + user.err[errss.Field()] + "\n"
			}
			error404 := &errorUser{
				Code: 404,
				Msg:  errs,
			}
			return c.JSON(http.StatusBadRequest, error404)
		}
		tokenString := CreateToken(user)
		return c.JSON(http.StatusOK, struct {
			Token string `json:"token"`
		}{
			Token: tokenString,
		})
}

// CreateToken - creates the token for the specified user
func CreateToken(u *user) (tokenString string) {
	timeNow := time.Now()
	timeNowUTC := timeNow.UTC()
	// finalize token props
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": u.ID,
		"exp": timeNowUTC.Add(time.Minute * 30)})
	tokenString, _ = token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	return
}

var validate *validator.Validate

// Error generic error return type
type errorUser struct {
	Code int    `json:"code" xml: "code"`
	Msg  string `json:"msg" xml: "msg"`
}

type user struct {
	ID  string `json:"name" validate:"required,gt=5"`
	err map[string]string
}

func (u *user) validate() (err error) {
	validate = validator.New()
	if err = validate.Struct(u); err != nil {
		return
	}
	return nil
}

func createUser() *user {
	return &user{
		err: map[string]string{
			"ID": "name - is required and length greater than 5",
		},
	}
}