from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    StudioInfo,
    FeaturedStory,
    SignatureService,
    GalleryPhoto,
    InvestmentPackage,
    Testimonial,
    Booking,
    ContactMessage
)
from .serializers import (
    StudioInfoSerializer,
    FeaturedStorySerializer,
    SignatureServiceSerializer,
    GalleryPhotoSerializer,
    InvestmentPackageSerializer,
    TestimonialSerializer,
    BookingSerializer,
    ContactMessageSerializer
)

class StudioInfoViewSet(viewsets.ModelViewSet):
    queryset = StudioInfo.objects.all()
    serializer_class = StudioInfoSerializer

class FeaturedStoryViewSet(viewsets.ModelViewSet):
    queryset = FeaturedStory.objects.all().order_by('order', '-created_at')
    serializer_class = FeaturedStorySerializer

class SignatureServiceViewSet(viewsets.ModelViewSet):
    queryset = SignatureService.objects.all().order_by('order', 'price_raw')
    serializer_class = SignatureServiceSerializer

class GalleryPhotoViewSet(viewsets.ModelViewSet):
    queryset = GalleryPhoto.objects.all().order_by('order', '-created_at')
    serializer_class = GalleryPhotoSerializer

    def get_queryset(self):
        queryset = GalleryPhoto.objects.all().order_by('order', '-created_at')
        category = self.request.query_params.get('category', None)
        if category and category != 'all':
            queryset = queryset.filter(category=category)
        return queryset

class InvestmentPackageViewSet(viewsets.ModelViewSet):
    queryset = InvestmentPackage.objects.all().order_by('order', 'price_raw')
    serializer_class = InvestmentPackageSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by('order', '-id')
    serializer_class = TestimonialSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer

    def get_queryset(self):
        queryset = Booking.objects.all().order_by('-created_at')
        status_param = self.request.query_params.get('status', None)
        if status_param and status_param != 'all':
            queryset = queryset.filter(status=status_param)
        return queryset

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer

@api_view(['GET'])
def health_check(request):
    return Response({
        "status": "healthy",
        "service": "Aaruthra Studio Django API",
        "app": "photography",
        "database": "SQLite / PostgreSQL Active",
        "version": "2.0.0"
    }, status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
def seed_database(request):
    """Seed the database with initial studio assets and records."""
    from .management.commands.seed_data import seed_studio_data
    result = seed_studio_data()
    return Response(result, status=status.HTTP_200_OK)
