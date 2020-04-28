from .base import *
from django.urls import path, include
import debug_toolbar

urlpatterns += [
    path("__debug__/", include(debug_toolbar.urls)),
    path("", include(("home.urls", "home"), namespace="home")),
]
