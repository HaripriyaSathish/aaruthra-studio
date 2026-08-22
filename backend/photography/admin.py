from django.contrib import admin
from django.utils.html import format_html
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

@admin.register(StudioInfo)
class StudioInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'phone', 'whatsapp_number', 'email', 'experience_years', 'weddings_photographed', 'updated_at')
    fieldsets = (
        ("Branding & Location", {
            "fields": ("name", "tagline", "founder_name", "city", "state", "address")
        }),
        ("Contact Lines", {
            "fields": ("phone", "whatsapp_number", "email")
        }),
        ("Heritage & Stats", {
            "fields": ("experience_years", "weddings_photographed", "heirloom_albums", "client_rating")
        }),
    )

@admin.register(FeaturedStory)
class FeaturedStoryAdmin(admin.ModelAdmin):
    list_display = ('couple', 'title', 'location', 'date', 'order', 'preview_thumbnail')
    list_filter = ('location', 'date')
    search_fields = ('couple', 'title', 'location', 'excerpt', 'full_story')
    list_editable = ('order',)

    def preview_thumbnail(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;" />', obj.cover_image)
        return "-"
    preview_thumbnail.short_description = "Cover Preview"

@admin.register(SignatureService)
class SignatureServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'starting_price', 'is_popular', 'order', 'preview_thumbnail')
    list_filter = ('is_popular',)
    search_fields = ('title', 'description', 'subtitle')
    list_editable = ('order', 'is_popular')

    def preview_thumbnail(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;" />', obj.cover_image)
        return "-"
    preview_thumbnail.short_description = "Image"

@admin.register(GalleryPhoto)
class GalleryPhotoAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'category_label', 'location', 'order', 'preview_thumbnail', 'created_at')
    list_filter = ('category', 'location')
    search_fields = ('title', 'category_label', 'location')
    list_editable = ('category', 'order')

    def preview_thumbnail(self, obj):
        if obj.image_url:
            return format_html('<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />', obj.image_url)
        return "-"
    preview_thumbnail.short_description = "Thumbnail"

@admin.register(InvestmentPackage)
class InvestmentPackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration', 'photographers', 'is_popular', 'order')
    list_filter = ('is_popular',)
    search_fields = ('name', 'description')
    list_editable = ('price', 'is_popular', 'order')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'wedding_date_venue', 'rating', 'verified', 'order', 'avatar_preview')
    list_filter = ('rating', 'verified')
    search_fields = ('name', 'wedding_date_venue', 'quote')
    list_editable = ('rating', 'verified', 'order')

    def avatar_preview(self, obj):
        if obj.avatar_url:
            return format_html('<img src="{}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;" />', obj.avatar_url)
        return "-"
    avatar_preview.short_description = "Client Avatar"

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'event_date', 'event_type', 'package_name', 'phone', 'status', 'created_at')
    list_filter = ('status', 'event_type', 'event_date')
    search_fields = ('client_name', 'email', 'phone', 'venue_location', 'notes')
    list_editable = ('status',)
    ordering = ('-created_at',)
    actions = ['mark_confirmed', 'mark_completed']

    @admin.action(description="Mark selected bookings as Confirmed")
    def mark_confirmed(self, request, queryset):
        queryset.update(status='confirmed')

    @admin.action(description="Mark selected bookings as Completed")
    def mark_completed(self, request, queryset):
        queryset.update(status='completed')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'preferred_contact', 'replied', 'created_at')
    list_filter = ('replied', 'preferred_contact', 'created_at')
    search_fields = ('name', 'email', 'phone', 'subject', 'message')
    list_editable = ('replied',)
    ordering = ('-created_at',)
