from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include, re_path

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

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all: anything not matched above falls through to the React app.
# Must stay last.
urlpatterns += [
    re_path(r'^.*$', frontend_index),
]