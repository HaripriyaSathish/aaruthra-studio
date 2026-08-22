"""
Django settings for Aaruthra Studio photography backend.
"""

import os
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BASE_DIR.parent

# Load environment variables from a .env file at the project root (if present).
load_dotenv(PROJECT_ROOT / '.env')

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-aaruthra-studio-key-secret-2026-south-indian-heritage')

DEBUG = os.getenv('DEBUG', 'True') == 'True'

_allowed_hosts = os.getenv('DJANGO_ALLOWED_HOSTS', '*')
ALLOWED_HOSTS = [h.strip() for h in _allowed_hosts.split(',') if h.strip()] or ['*']

# Automatically apply migrations and seed sample data on startup so nobody
# has to run `manage.py migrate` / `createsuperuser` by hand. Safe to leave
# on in production since both operations are idempotent.
AUTO_MIGRATE = os.getenv('AUTO_MIGRATE', 'True') == 'True'
AUTO_SEED = os.getenv('AUTO_SEED', 'True') == 'True'

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'cloudinary_storage',
    'django.contrib.staticfiles',
    'cloudinary',

    # Third party packages
    'rest_framework',
    'corsheaders',

    # Core app
    'photography.apps.PhotographyConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'studio_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'studio_backend.wsgi.application'
ASGI_APPLICATION = 'studio_backend.asgi.application'

# Database
# Default to SQLite (zero-config), or switch to PostgreSQL/MySQL/etc by
# setting DATABASE_URL, e.g. postgres://user:password@host:5432/dbname
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files (photos uploaded via Django admin)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Single-deployment mode: the built React app (frontend/dist) is served
# directly by Django via WhiteNoise, so both frontend and backend live
# behind one Render URL. WHITENOISE_ROOT serves any file found in that
# folder (index.html, hashed JS/CSS bundles, favicon, etc.) at the site
# root, matching Vite's default root-relative asset paths. Only set when
# the folder actually exists so local dev without a frontend build isn't
# affected.
FRONTEND_DIST_DIR = PROJECT_ROOT / 'frontend' / 'dist'
if FRONTEND_DIST_DIR.exists():
    WHITENOISE_ROOT = str(FRONTEND_DIST_DIR)

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': None,
}

# CORS Configuration for React Frontend (Port 3000 / 5173 / Preview container)
CORS_ALLOW_ALL_ORIGINS = os.getenv('CORS_ALLOW_ALL_ORIGINS', 'True') == 'True'
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^http://localhost:[0-9]+$",
    r"^http://127.0.0.1:[0-9]+$",
    r"^https://.*\.run\.app$",
]
# Extra exact origins for a deployed frontend, comma-separated, e.g.
# CORS_ALLOWED_ORIGINS=https://aaruthra-studio.vercel.app
_extra_cors_origins = os.getenv('CORS_ALLOWED_ORIGINS', '')
CORS_ALLOWED_ORIGINS = [o.strip() for o in _extra_cors_origins.split(',') if o.strip()]

# Cloudinary Settings — when all three are set, uploaded photos (StudioInfo
# hero/parallax/photographer images, story/service/gallery/testimonial
# images) are stored permanently on Cloudinary instead of the app's local
# disk. Without them, ImageField uploads just fall back to local disk
# storage under MEDIA_ROOT, which is fine for local dev but gets wiped on
# every redeploy on most hosts (e.g. Render's free tier).
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUDINARY_CLOUD_NAME', ''),
    'API_KEY': os.getenv('CLOUDINARY_API_KEY', ''),
    'API_SECRET': os.getenv('CLOUDINARY_API_SECRET', ''),
}
USE_CLOUDINARY = all(CLOUDINARY_STORAGE.values())

STORAGES = {
    'default': {
        'BACKEND': 'cloudinary_storage.storage.MediaCloudinaryStorage'
        if USE_CLOUDINARY
        else 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage',
    },
}