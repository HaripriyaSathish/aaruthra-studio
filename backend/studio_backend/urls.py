from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "Aaruthra Studio Administration"
admin.site.site_title = "Aaruthra Studio Portal"
admin.site.index_title = "Wedding Photography & Heritage Management"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('photography.urls')),
]
