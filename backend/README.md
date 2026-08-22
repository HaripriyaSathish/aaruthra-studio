# Aaruthra Studio - Django & SQL Backend

Full Django REST Framework backend with Django Admin Panel, PostgreSQL / SQLite support, Cloudinary asset storage, and email/WhatsApp notification webhooks.

## Features
- **Django Admin Panel (`/admin/`)**: Comprehensive back-office management for Bookings, Inquiries, Gallery Photos, and Packages.
- **RESTful Endpoints (`/api/`)**:
  - `GET/POST /api/bookings/`: Create and review wedding bookings with calendar date checks.
  - `GET/POST /api/messages/`: Contact messages with direct WhatsApp, Email, or Call action tags.
  - `GET/POST/PUT/DELETE /api/gallery/`: Curated photo archive with Cloudinary image hosting.
  - `GET/POST/PUT/DELETE /api/packages/`: Investment tier details and pricing.
  - `GET /api/health/`: Backend health status.
- **Cloudinary Storage**: Direct integration for wedding high-res photos and asset delivery.
- **Database**: SQLite default (zero-config) or PostgreSQL (production-ready).

## Quick Start

### 1. Install Python Dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Environment Variables (.env)
```env
DJANGO_SECRET_KEY=your-production-secret-key
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/aaruthra_db # optional, defaults to sqlite
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run Migrations & Create Superuser
```bash
python ../manage.py makemigrations
python ../manage.py migrate
python ../manage.py createsuperuser
```

### 4. Start Backend Server
```bash
python ../manage.py runserver 8000
```
- Django API will run at `http://127.0.0.1:8000/api/`
- Django Admin panel will run at `http://127.0.0.1:8000/admin/`
