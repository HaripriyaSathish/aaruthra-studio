from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudioInfoViewSet,
    FeaturedStoryViewSet,
    SignatureServiceViewSet,
    GalleryPhotoViewSet,
    InvestmentPackageViewSet,
    TestimonialViewSet,
    BookingViewSet,
    ContactMessageViewSet,
    health_check,
    seed_database
)

router = DefaultRouter()
router.register(r'studio-info', StudioInfoViewSet, basename='studio-info')
router.register(r'stories', FeaturedStoryViewSet, basename='featured-story')
router.register(r'services', SignatureServiceViewSet, basename='signature-service')
router.register(r'gallery', GalleryPhotoViewSet, basename='gallery-photo')
router.register(r'packages', InvestmentPackageViewSet, basename='investment-package')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'messages', ContactMessageViewSet, basename='contact-message')

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('seed/', seed_database, name='seed-database'),
    path('', include(router.urls)),
]
