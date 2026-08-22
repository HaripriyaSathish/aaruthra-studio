from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "Aaruthra Studio Administration"
admin.site.site_title = "Aaruthra Studio Portal"
admin.site.index_title = "Wedding Photography & Heritage Management"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('photography.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)