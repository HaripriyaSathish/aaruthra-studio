import os
import sys

from django.apps import AppConfig
from django.conf import settings

# Management commands where the developer is explicitly managing migrations
# or the database themselves — auto-migrate/auto-seed should stay out of the way.
EXPLICIT_COMMANDS = {
    'makemigrations', 'migrate', 'seed_data', 'shell', 'shell_plus',
    'test', 'collectstatic', 'createsuperuser', 'dbshell', 'dumpdata', 'loaddata',
}


class PhotographyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'photography'
    verbose_name = 'Aaruthra Studio Photography Management'

    def ready(self):
        if not (len(sys.argv) > 1 and sys.argv[1] in EXPLICIT_COMMANDS):
            cloud_name = getattr(settings, 'CLOUDINARY_STORAGE', {}).get('CLOUD_NAME', '')
            has_key = bool(getattr(settings, 'CLOUDINARY_STORAGE', {}).get('API_KEY'))
            has_secret = bool(getattr(settings, 'CLOUDINARY_STORAGE', {}).get('API_SECRET'))
            if getattr(settings, 'USE_CLOUDINARY', False):
                print(f"[photography] Cloudinary storage: ENABLED (cloud_name='{cloud_name}')")
            else:
                print(
                    f"[photography] Cloudinary storage: DISABLED — uploads go to local disk. "
                    f"CLOUDINARY_CLOUD_NAME={'set' if cloud_name else 'MISSING'}, "
                    f"CLOUDINARY_API_KEY={'set' if has_key else 'MISSING'}, "
                    f"CLOUDINARY_API_SECRET={'set' if has_secret else 'MISSING'}"
                )

        auto_migrate = getattr(settings, 'AUTO_MIGRATE', False)
        auto_seed = getattr(settings, 'AUTO_SEED', False)
        if not (auto_migrate or auto_seed):
            return

        if len(sys.argv) > 1 and sys.argv[1] in EXPLICIT_COMMANDS:
            return

        from django.core.management import call_command

        if auto_migrate:
            try:
                call_command('migrate', interactive=False, verbosity=0)
            except Exception as exc:
                print(f"[photography] auto-migrate skipped: {exc}")

        if auto_seed:
            try:
                from .management.commands.seed_data import seed_studio_data
                seed_studio_data()
            except Exception as exc:
                print(f"[photography] auto-seed skipped: {exc}")

        # Optional: auto-create a Django admin superuser from env vars so
        # nobody has to run `createsuperuser` interactively. No-op unless
        # all three DJANGO_SUPERUSER_* vars are set.
        username = os.getenv('DJANGO_SUPERUSER_USERNAME')
        email = os.getenv('DJANGO_SUPERUSER_EMAIL')
        password = os.getenv('DJANGO_SUPERUSER_PASSWORD')
        if username and email and password:
            try:
                from django.contrib.auth import get_user_model
                User = get_user_model()
                if not User.objects.filter(username=username).exists():
                    User.objects.create_superuser(username=username, email=email, password=password)
            except Exception as exc:
                print(f"[photography] auto-superuser skipped: {exc}")