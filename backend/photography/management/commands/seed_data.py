from django.core.management.base import BaseCommand
from photography.models import (
    StudioInfo,
    FeaturedStory,
    SignatureService,
    GalleryPhoto,
    InvestmentPackage,
    Testimonial,
    Booking
)

def seed_studio_data():
    # 1. Studio Info
    studio, _ = StudioInfo.objects.get_or_create(
        id=1,
        defaults={
            "name": "Aaruthra Studio",
            "tagline": "Sacred Tamil Wedding Photography & Heirloom Cinematography",
            "city": "Madurai",
            "state": "Tamil Nadu, India",
            "address": "East Veli Street, Near Meenakshi Amman Temple, Madurai - 625001",
            "phone": "+91 98765 43210",
            "whatsapp_number": "919876543210",
            "email": "namaste@aaruthrastudio.com",
            "founder_name": "Aaruthra Selvan",
            "experience_years": "12+",
            "weddings_photographed": "450+",
            "heirloom_albums": "380+",
            "client_rating": "4.9/5",
        }
    )

    # 2. Featured Sacred Stories
    stories_data = [
        {
            "id": 1,
            "title": "A Sacred Sunrise Muhurtham in the Temple City",
            "couple": "Ananya & Karthik",
            "subtitle": "Madurai Meenakshi Amman Heritage Precinct",
            "location": "Madurai, Tamil Nadu",
            "date": "February 2026",
            "cover_image": "/assets/hero-muhurtham-D4_7cK4Y.jpg",
            "excerpt": "Under the towering gopurams of Madurai, Ananya and Karthik exchanged garlands amid nadaswaram ragas and pure silk Kanjivarams.",
            "full_story": "The morning began at 4:30 AM with the sacred thirumanjanam and early morning nadaswaram echoes filling the courtyard. As the sun crested the stone pillars of the temple mandapam, the auspicious Koorai pudavai was blessed by three generations of elders. Every glance between Ananya and Karthik was framed by bronze kuthuvilakku lamps and fresh Madurai Malli garlands.",
            "highlights": ["Dawn Nadaswaram at 4:30 AM", "Ancestral Gold Thali Blessing", "Oonjal Swing Songs by Aunts", "1000-Pillar Hall Couple Portraits"],
            "gallery_images": [
                "/assets/hero-muhurtham-D4_7cK4Y.jpg",
                "/assets/story-cheOperation-CFsV20pL.jpg",
                "/assets/gallery-groom-BvKkL7m0.jpg",
                "/assets/gallery-thali-CKx69701.jpg"
            ],
            "order": 1
        },
        {
            "id": 2,
            "title": "Courtyard Radiance & Ancestral Chettinad Grace",
            "couple": "Meera & Siddharth",
            "subtitle": "Karaikudi Heritage Palace Estate",
            "location": "Karaikudi, Chettinad",
            "date": "January 2026",
            "cover_image": "/assets/story-cheOperation-CFsV20pL.jpg",
            "excerpt": "Belgian glass chandeliers, Burmese teak pillars, and Athangudi tiled corridors set the stage for Meera and Siddharth's three-day royal wedding.",
            "full_story": "Rooted in centuries-old Chettinad architecture, this celebration was an homage to heirloom aesthetics. From the grand Mappillai Azhaippu procession in open horse carriages to the intimate evening Vratham rituals in the inner thinnai courtyard, we documented every detail of this unforgettable union.",
            "highlights": ["Handmade Athangudi Tile Backdrops", "Chettinad Brass Urli Floral Decor", "Traditional Mappillai Azhaippu", "Candid Courtyard Sitar Performances"],
            "gallery_images": [
                "/assets/story-cheOperation-CFsV20pL.jpg",
                "/assets/gallery-bride-DS4k_p0L.jpg",
                "/assets/gallery-oonjal-CL6bY78z.jpg",
                "/assets/gallery-couple-CBk780a1.jpg"
            ],
            "order": 2
        }
    ]
    for s in stories_data:
        FeaturedStory.objects.update_or_create(id=s["id"], defaults=s)

    # 3. Signature Offerings / Services
    services_data = [
        {
            "id": 1,
            "title": "Sacred Muhurtham & Ritual Chronicles",
            "subtitle": "Pure Temple Ceremonies & Auspicious Rites",
            "description": "Comprehensive visual documentation of dawn rituals, Koorai pudavai drapery, Thali tying, Saptapadi, and familial blessings.",
            "deliverables": [
                "2 Senior Candid Photographers + 1 Traditional Master",
                "Full-Length Documentary 4K Film + 5-Min Cinematic Teaser",
                "High-Resolution Color Graded Digital Archive (600+ images)",
                "Handcrafted Italian Velvet Heirloom Album (40 Pages)"
            ],
            "starting_price": "₹1,20,000",
            "price_raw": 120000,
            "cover_image": "/assets/hero-muhurtham-D4_7cK4Y.jpg",
            "is_popular": True,
            "order": 1
        },
        {
            "id": 2,
            "title": "Royal Chettinad & Destination Celebrations",
            "subtitle": "Multi-Day Palatial Celebrations",
            "description": "Bespoke photography suite designed for 2 to 3-day celebrations spanning Vratham, Sangeet, Muhurtham, and Grand Reception.",
            "deliverables": [
                "4-Camera Elite Cinema & Candid Photography Crew",
                "Aerial 4K Drone Coverage across Historic Mandapams",
                "Same-Day Edit Highlights Reel for Reception Display",
                "2 Large Imperial Lay-Flat Heritage Albums + Mini Parent Albums"
            ],
            "starting_price": "₹2,50,000",
            "price_raw": 250000,
            "cover_image": "/assets/story-cheOperation-CFsV20pL.jpg",
            "is_popular": False,
            "order": 2
        },
        {
            "id": 3,
            "title": "Heirloom Pre-Wedding & Temple Portraits",
            "subtitle": "Timeless Couple Stories in Heritage Environs",
            "description": "Editorial couple portraits set against Tamil Nadu's architectural gems — temple tanks, coastal shore temples, and colonial courtyards.",
            "deliverables": [
                "Full-Day Guided Creative Portrait Session",
                "Styling Consultation & Authentic Heritage Props",
                "80 Magazine-Grade Retouched Master Portraits",
                "Fine-Art Archival Linen Canvas Framed Print (24x36 in)"
            ],
            "starting_price": "₹65,000",
            "price_raw": 65000,
            "cover_image": "/assets/gallery-couple-CBk780a1.jpg",
            "is_popular": False,
            "order": 3
        }
    ]
    for s in services_data:
        SignatureService.objects.update_or_create(id=s["id"], defaults=s)

    # 4. Gallery Photos
    gallery_data = [
        {
            "id": 1,
            "title": "Auspicious Mangalya Dharanam",
            "category": "muhurtham",
            "category_label": "Sacred Muhurtham",
            "location": "Madurai",
            "image_url": "/assets/gallery-thali-CKx69701.jpg",
            "order": 1
        },
        {
            "id": 2,
            "title": "The Golden Kanjivaram & Temple Jewels",
            "category": "portraits",
            "category_label": "Portraits & Heirloom",
            "location": "Tirunelveli",
            "image_url": "/assets/gallery-bride-DS4k_p0L.jpg",
            "order": 2
        },
        {
            "id": 3,
            "title": "Chettinad Pillar Courtyard Walk",
            "category": "couples",
            "category_label": "Couples & Pre-Wedding",
            "location": "Karaikudi",
            "image_url": "/assets/gallery-couple-CBk780a1.jpg",
            "order": 3
        },
        {
            "id": 4,
            "title": "Oonjal Swing & Maternal Blessings",
            "category": "rituals",
            "category_label": "Rituals & Traditions",
            "location": "Tanjore",
            "image_url": "/assets/gallery-oonjal-CL6bY78z.jpg",
            "order": 4
        },
        {
            "id": 5,
            "title": "Veshti & Angavastram Traditional Groom",
            "category": "portraits",
            "category_label": "Portraits & Heirloom",
            "location": "Madurai",
            "image_url": "/assets/gallery-groom-BvKkL7m0.jpg",
            "order": 5
        },
        {
            "id": 6,
            "title": "Saptapadi Seven Sacred Steps",
            "category": "muhurtham",
            "category_label": "Sacred Muhurtham",
            "location": "Chennai",
            "image_url": "/assets/hero-muhurtham-D4_7cK4Y.jpg",
            "order": 6
        },
        {
            "id": 7,
            "title": "Kanya Dhaanam Emotion & Tears",
            "category": "rituals",
            "category_label": "Rituals & Traditions",
            "location": "Coimbatore",
            "image_url": "/assets/break-parallax-DXD94pgG.jpg",
            "order": 7
        },
        {
            "id": 8,
            "title": "Evening Reception Grandeur",
            "category": "couples",
            "category_label": "Couples & Pre-Wedding",
            "location": "Trichy",
            "image_url": "/assets/story-cheOperation-CFsV20pL.jpg",
            "order": 8
        }
    ]
    for g in gallery_data:
        GalleryPhoto.objects.update_or_create(id=g["id"], defaults=g)

    # 5. Investment Packages
    packages_data = [
        {
            "id": 1,
            "name": "Karpagam Collection",
            "badge": "Essential Muhurtham",
            "description": "Ideal for single-day temple weddings and intimate traditional ceremonies.",
            "price": "₹1,25,000",
            "price_raw": 125000,
            "duration": "1 Day (Up to 10 Hours)",
            "photographers": "2 Candid Photographers + 1 Cinematographer",
            "inclusions": [
                "Full Muhurtham & Early Morning Ritual Coverage",
                "High-Resolution Color Graded Digital Gallery (400+ photos)",
                "3-5 Minute Cinematic Highlights Teaser",
                "1 Premium Leatherette Heirloom Album (30 Pages)",
                "Online Private Family Viewing Gallery for 1 Year"
            ],
            "is_popular": False,
            "order": 1
        },
        {
            "id": 2,
            "name": "Rajaraja Imperial",
            "badge": "Most Cherished",
            "description": "Our signature comprehensive suite for full 2-day multi-ceremonial Tamil weddings.",
            "price": "₹2,40,000",
            "price_raw": 240000,
            "duration": "2 Days (Vratham, Reception, Muhurtham)",
            "photographers": "3 Master Photographers + 2 Senior Cinematographers",
            "inclusions": [
                "Complete Vratham, Evening Reception & Sacred Muhurtham",
                "Drone Aerial Cinematography of Historic Mandapam",
                "Full Length Documentary Film (40-60 Mins) + 4K Teaser",
                "1 Grand Italian Velvet Album (50 Pages) + 2 Parent Albums",
                "Same-Day Edit Video Reel for Social Media / WhatsApp",
                "Complimentary 2-Hour Pre-Wedding Creative Session"
            ],
            "is_popular": True,
            "order": 2
        },
        {
            "id": 3,
            "name": "Chettinad Heritage Grandeur",
            "badge": "Bespoke Royal",
            "description": "The ultimate legacy archive for multi-day destination and heritage palace weddings.",
            "price": "₹3,75,000",
            "price_raw": 375000,
            "duration": "3-4 Days (Unlimited Hours)",
            "photographers": "Aaruthra Selvan + 5 Elite Visual Artisans",
            "inclusions": [
                "Full Multi-Day Access (Mehendi, Sangeet, Oonjal, Muhurtham, Royal Banquet)",
                "Dual Drone Master Pilot Coverage in 4K Cinema DCI",
                "Cinema-Grade Color Grading with Custom Traditional LUTs",
                "3 Hand-Stitched Pure Silk Boxed Archival Albums (60 Pages each)",
                "Complete Raw Footage Archive on Encrypted SSD",
                "Framed Museum Canvas Print (24x36 inches)"
            ],
            "is_popular": False,
            "order": 3
        }
    ]
    for p in packages_data:
        InvestmentPackage.objects.update_or_create(id=p["id"], defaults=p)

    # 6. Testimonials
    testimonials_data = [
        {
            "id": 1,
            "name": "Dr. Soundarya & Vignesh",
            "couple_names": "Soundarya & Vignesh",
            "role": "Bride & Groom",
            "wedding_date_venue": "Madurai Meenakshi Kalyana Mandapam · Jan 2026",
            "rating": 5,
            "quote": "Aaruthra and his team felt like family. They knew exactly where to stand during the Thali ceremony without ever blocking the sacred homam or the elders. When we opened our velvet album, my grandmother had tears in her eyes.",
            "avatar_url": "/assets/gallery-bride-DS4k_p0L.jpg",
            "verified": True,
            "order": 1
        },
        {
            "id": 2,
            "name": "Kavitha & Arvind Ramanathan",
            "couple_names": "Kavitha & Arvind",
            "role": "Bride & Groom",
            "wedding_date_venue": "Chettinad Heritage Mansion, Karaikudi · Dec 2025",
            "rating": 5,
            "quote": "The way they captured the natural morning sunlight filtering through the teak pillars during our Oonjal ritual was pure poetry. The colours of our silk sarees look rich and authentic, not over-saturated.",
            "avatar_url": "/assets/story-cheOperation-CFsV20pL.jpg",
            "verified": True,
            "order": 2
        },
        {
            "id": 3,
            "name": "Nithya & Sriram",
            "couple_names": "Nithya & Sriram",
            "role": "Bride & Groom",
            "wedding_date_venue": "Tanjore Royal Heritage Palace · Nov 2025",
            "rating": 5,
            "quote": "If you care about genuine heritage aesthetics and un-staged candid emotions, Aaruthra Studio is simply unparalleled in South India. They delivered our preview gallery in just 5 days!",
            "avatar_url": "/assets/hero-muhurtham-D4_7cK4Y.jpg",
            "verified": True,
            "order": 3
        }
    ]
    for t in testimonials_data:
        Testimonial.objects.update_or_create(id=t["id"], defaults=t)

    # 7. Sample Initial Booking
    Booking.objects.get_or_create(
        client_name="Pooja & Ravindran",
        defaults={
            "email": "pooja.ravi@example.com",
            "phone": "+91 98401 23456",
            "event_date": "2026-11-15",
            "event_type": "Sacred Muhurtham & Grand Reception",
            "package_name": "Rajaraja Imperial",
            "venue_location": "Raja Muthiah Mandram, Madurai",
            "guest_count": "800 - 1000",
            "notes": "Looking for dawn nadaswaram coverage and Oonjal songs coverage.",
            "status": "confirmed",
            "estimated_amount": "₹2,40,000"
        }
    )

    return {
        "status": "success",
        "message": "Aaruthra Studio database seeded successfully with all sacred stories, services, gallery items, packages, and testimonials!",
        "stats": {
            "stories": FeaturedStory.objects.count(),
            "services": SignatureService.objects.count(),
            "gallery_photos": GalleryPhoto.objects.count(),
            "packages": InvestmentPackage.objects.count(),
            "testimonials": Testimonial.objects.count(),
            "bookings": Booking.objects.count(),
        }
    }

class Command(BaseCommand):
    help = 'Seeds initial wedding photography data for Aaruthra Studio'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Starting database seeding for Aaruthra Studio..."))
        result = seed_studio_data()
        self.stdout.write(self.style.SUCCESS(f"Result: {result['message']}"))
        for k, v in result['stats'].items():
            self.stdout.write(f" - {k}: {v}")
