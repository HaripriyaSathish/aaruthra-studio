from django.db import models

class StudioInfo(models.Model):
    name = models.CharField(max_length=255, default="Aaruthra Studio")
    tagline = models.CharField(max_length=255, default="Sacred Tamil Wedding Photography & Heirloom Cinematography")
    city = models.CharField(max_length=128, default="Madurai")
    state = models.CharField(max_length=128, default="Tamil Nadu, India")
    address = models.CharField(max_length=255, default="East Veli Street, Near Meenakshi Amman Temple, Madurai - 625001")
    phone = models.CharField(max_length=32, default="+91 98765 43210")
    whatsapp_number = models.CharField(max_length=32, default="919876543210")
    email = models.EmailField(default="namaste@aaruthrastudio.com")
    founder_name = models.CharField(max_length=128, default="Aaruthra Selvan")
    experience_years = models.CharField(max_length=32, default="12+")
    weddings_photographed = models.CharField(max_length=32, default="450+")
    heirloom_albums = models.CharField(max_length=32, default="380+")
    client_rating = models.CharField(max_length=32, default="4.9/5")
    hero_image = models.ImageField(upload_to='studio/', blank=True, null=True, help_text="Homepage hero banner background")
    parallax_image = models.ImageField(upload_to='studio/', blank=True, null=True, help_text="Full-bleed quote/parallax section background")
    photographer_image = models.ImageField(upload_to='studio/', blank=True, null=True, help_text="Founder/photographer portrait for the About section")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Studio Profile & Contact Information"
        verbose_name_plural = "Studio Profile & Contact Information"

    def __str__(self):
        return f"{self.name} - {self.city}"


class FeaturedStory(models.Model):
    title = models.CharField(max_length=255)
    couple = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255)
    date = models.CharField(max_length=128)
    cover_image = models.ImageField(upload_to='stories/')
    excerpt = models.TextField()
    full_story = models.TextField()
    highlights = models.JSONField(default=list, blank=True, help_text="List of string highlights")
    gallery_images = models.JSONField(default=list, blank=True, help_text="List of image URLs")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Featured Sacred Story"
        verbose_name_plural = "Featured Sacred Stories"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.couple} - {self.title}"


class SignatureService(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    deliverables = models.JSONField(default=list, help_text="List of deliverables")
    starting_price = models.CharField(max_length=64)
    price_raw = models.IntegerField(default=0)
    cover_image = models.ImageField(upload_to='services/')
    is_popular = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Signature Offering / Service"
        verbose_name_plural = "Signature Offerings / Services"
        ordering = ['order', 'price_raw']

    def __str__(self):
        return f"{self.title} ({self.starting_price})"


class GalleryPhoto(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All Ceremonies'),
        ('muhurtham', 'Sacred Muhurtham'),
        ('couples', 'Couples & Pre-Wedding'),
        ('rituals', 'Rituals & Traditions'),
        ('portraits', 'Portraits & Heirloom'),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=64, choices=CATEGORY_CHOICES, default='muhurtham')
    category_label = models.CharField(max_length=128)
    location = models.CharField(max_length=128, default="Madurai")
    image_url = models.ImageField(upload_to='gallery/')
    cloudinary_public_id = models.CharField(max_length=255, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Portfolio Photo"
        verbose_name_plural = "Portfolio Photos"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} [{self.category_label}]"


class InvestmentPackage(models.Model):
    name = models.CharField(max_length=255)
    badge = models.CharField(max_length=128, blank=True, null=True)
    description = models.TextField()
    price = models.CharField(max_length=64)
    price_raw = models.IntegerField(default=0)
    duration = models.CharField(max_length=128)
    photographers = models.CharField(max_length=255)
    inclusions = models.JSONField(default=list, help_text="List of string inclusions")
    is_popular = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Investment Package"
        verbose_name_plural = "Investment Packages"
        ordering = ['order', 'price_raw']

    def __str__(self):
        return f"{self.name} - {self.price}"


class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    couple_names = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=128, default="Bride & Groom")
    wedding_date_venue = models.CharField(max_length=255)
    rating = models.PositiveIntegerField(default=5)
    quote = models.TextField()
    avatar_url = models.ImageField(upload_to='testimonials/')
    verified = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Client Testimonial"
        verbose_name_plural = "Client Testimonials"
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.name} ({self.rating}★) - {self.wedding_date_venue}"


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('confirmed', 'Confirmed & Reserved'),
        ('completed', 'Completed Event'),
        ('cancelled', 'Cancelled'),
    ]

    client_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=32)
    event_date = models.DateField()
    event_type = models.CharField(max_length=128)
    package_name = models.CharField(max_length=128)
    venue_location = models.CharField(max_length=255)
    guest_count = models.CharField(max_length=64, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default='pending')
    estimated_amount = models.CharField(max_length=64, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Wedding Date Booking"
        verbose_name_plural = "Wedding Date Bookings"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client_name} - {self.event_date} ({self.status.upper()})"


class ContactMessage(models.Model):
    CONTACT_CHOICES = [
        ('whatsapp', 'WhatsApp'),
        ('email', 'Email'),
        ('call', 'Direct Phone Call'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=32)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    preferred_contact = models.CharField(max_length=32, choices=CONTACT_CHOICES, default='whatsapp')
    replied = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Client Inquiry / Message"
        verbose_name_plural = "Client Inquiries / Messages"
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"