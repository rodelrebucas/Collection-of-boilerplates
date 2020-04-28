from .base import *
from .log.custom import *
import datetime

# --> for production.py

# -->> Can't be empty on production setup
ALLOWED_HOSTS = [""]

## -->> Expire sessions
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

ROOT_URLCONF = "config.urls.production"

THIRD_PARTY_APPS = ()
INSTALLED_APPS += THIRD_PARTY_APPS


# DEFINE host and dsn only if ODBC setup is enabled
# example on the deployment folder
DATABASES = {
    "default": {
        "ENGINE": "sql_server.pyodbc",
        "HOST": "",
        "NAME": "",
        "USER": env("DEFAULT_DB_USER"),
        "PASSWORD": env("DEFAULT_DB_PASSWORD"),
        "OPTIONS": {
            "driver": "FreeTDS",
            "host_is_server": True,
            # 'dsn': 'ODBC setup',
        },
    },
}

# --> Implement caching
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "unix://run/redis/redis.sock",
        "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient",},
        "KEY_PREFIX": "KEY HERE",
    }
}

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_jwt.authentication.JSONWebTokenAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    )
}

# expire the token in 1 year
JWT_AUTH = {"JWT_EXPIRATION_DELTA": datetime.timedelta(seconds=31557600)}


CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "asgi_redis.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("localhost", 6379)],
            #'hosts': [('10.77.3.94', 6379)],
        },
        "ROUTING": "botlog.routing.channel_routing",
    }
}

LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/login"
# from documentation

# -->> MORE security on deployment ,Please check documentation
# for more details
# SECURE_PROXY_SSL_HEADER
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTOCOL", "https")
# -->> Set to true to avoid transmitting these cookies to HTTP accidentally
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"
SECURE_BROWSER_XSS_FILTER = True
# SESSION_COOKIE_HTTPONLY = True
# One hr testing, 31536000 secs = 1 year
SECURE_HSTS_SECONDS = 63072000
# For subdomains
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
