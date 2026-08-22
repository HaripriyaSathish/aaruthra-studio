from rest_framework import serializers
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

class StudioInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioInfo
        fields = '__all__'

class FeaturedStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedStory
        fields = '__all__'

class SignatureServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignatureService
        fields = '__all__'

class GalleryPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryPhoto
        fields = '__all__'

class InvestmentPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestmentPackage
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
