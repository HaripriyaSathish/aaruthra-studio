from django.conf import settings
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include, re_path
from django.views.static import serve as serve_static_file

admin.site.site_header = "Aaruthra Studio Administration"
admin.site.site_title = "Aaruthra Studio Portal"
admin.site.index_title = "Wedding Photography & Heritage Management"


def frontend_index(request, *args, **kwargs):
    """Serves the built React app's index.html for any route that isn't
    the API, admin, media, or a static asset file (which WhiteNoise
    intercepts before this view is ever reached). Lets the React Router
    handle client-side paths like /#stories on a full page load."""
    index_path = settings.FRONTEND_DIST_DIR / 'index.html'
    if index_path.exists():
        return HttpResponse(index_path.read_text(encoding='utf-8'))
    return HttpResponse(
        "Frontend build not found. Run `npm run build` inside frontend/ first.",
        status=501,
    )


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('photography.urls')),
]

# Serves uploaded media files directly, in every environment (not just
# DEBUG). Deliberately NOT using django.conf.urls.static.static() here —
# that helper silently registers zero URL patterns whenever DEBUG=False,
# no matter how it's called, which is exactly what caused media requests
# to fall through to the catch-all frontend route below and return the
# React app's index.html (with a 200 status) instead of the actual image.
# This deployment has no separate media host/CDN in front of it when
# Cloudinary isn't configured, so Django has to serve these files itself.
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve_static_file, {'document_root': settings.MEDIA_ROOT}),
]

# Catch-all: anything not matched above falls through to the React app.
# Must stay last.
urlpatterns += [
    re_path(r'^.*$', frontend_index),
]