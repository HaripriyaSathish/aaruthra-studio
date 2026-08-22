import { CloudinaryConfig } from '../types';
import { INITIAL_CLOUDINARY_CONFIG } from '../data/initialData';

const KEYS = {
  CLOUDINARY: 'aaruthra_cloudinary_v1'
};

// Cloudinary is a direct browser-to-Cloudinary integration (unsigned upload
// preset), so its config is intentionally kept client-side rather than
// round-tripped through the Django backend.
export const StorageService = {
  getCloudinaryConfig(): CloudinaryConfig {
    try {
      const data = localStorage.getItem(KEYS.CLOUDINARY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CLOUDINARY_CONFIG;
  },

  saveCloudinaryConfig(config: CloudinaryConfig) {
    localStorage.setItem(KEYS.CLOUDINARY, JSON.stringify(config));
  },

  async uploadToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
    const config = this.getCloudinaryConfig();
    if (!config.cloudName || !config.uploadPreset) {
      // If no custom Cloudinary configured, convert to Base64 data URL for local preview
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            url: reader.result as string,
            publicId: 'local_' + Date.now()
          });
        };
        reader.readAsDataURL(file);
      });
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || 'Failed to upload to Cloudinary');
    }

    const data = await res.json();
    return {
      url: data.secure_url || data.url,
      publicId: data.public_id
    };
  }
};