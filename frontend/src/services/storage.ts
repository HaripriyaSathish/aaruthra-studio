import { 
  BookingRequest, 
  ContactMessage, 
  GalleryPhoto, 
  PackageItem, 
  TestimonialItem, 
  CloudinaryConfig 
} from '../types';
import { 
  INITIAL_GALLERY, 
  INITIAL_PACKAGES, 
  INITIAL_TESTIMONIALS, 
  INITIAL_CLOUDINARY_CONFIG 
} from '../data/initialData';

const KEYS = {
  BOOKINGS: 'aaruthra_bookings_v1',
  MESSAGES: 'aaruthra_messages_v1',
  GALLERY: 'aaruthra_gallery_v1',
  PACKAGES: 'aaruthra_packages_v1',
  TESTIMONIALS: 'aaruthra_testimonials_v1',
  CLOUDINARY: 'aaruthra_cloudinary_v1'
};

export const StorageService = {
  // Bookings
  getBookings(): BookingRequest[] {
    try {
      const data = localStorage.getItem(KEYS.BOOKINGS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    const sample: BookingRequest[] = [
      {
        id: "book-101",
        clientName: "Meenakshi & Sundaram",
        email: "meenakshi.s@gmail.com",
        phone: "+91 94432 18902",
        eventDate: "2026-11-18",
        eventType: "Sacred Muhurtham & Reception",
        packageId: "pkg-heritage",
        packageName: "The Heritage Classic",
        venueLocation: "Raja Muthiah Mandapam, Madurai",
        guestCount: "450 guests",
        notes: "Morning 6:00 AM Muhurtham followed by traditional feast and evening reception. We love candid black and white shots.",
        status: "confirmed",
        createdAt: "2026-08-15T10:30:00.000Z",
        estimatedAmount: "₹1,25,000"
      },
      {
        id: "book-102",
        clientName: "Kavitha & Arvind",
        email: "arvind.kavitha@outlook.com",
        phone: "+91 98401 55678",
        eventDate: "2026-12-04",
        eventType: "Destination Temple Wedding",
        packageId: "pkg-legacy",
        packageName: "The Royal Heirloom Legacy",
        venueLocation: "Heritage Resort & Temple, Kumbakonam",
        guestCount: "250 guests",
        notes: "3-day ceremony including Nalangu, Oonjal, and post-wedding temple shoot.",
        status: "pending",
        createdAt: "2026-08-20T14:15:00.000Z",
        estimatedAmount: "₹2,40,000"
      }
    ];
    this.saveBookings(sample);
    return sample;
  },

  saveBookings(bookings: BookingRequest[]) {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  addBooking(booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest {
    const bookings = this.getBookings();
    const newBooking: BookingRequest = {
      ...booking,
      id: 'book-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    bookings.unshift(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  },

  updateBookingStatus(id: string, status: BookingRequest['status']) {
    const bookings = this.getBookings();
    const idx = bookings.findIndex(b => b.id === id);
    if (idx !== -1) {
      bookings[idx].status = status;
      this.saveBookings(bookings);
    }
  },

  deleteBooking(id: string) {
    const bookings = this.getBookings().filter(b => b.id !== id);
    this.saveBookings(bookings);
  },

  // Contact Messages
  getMessages(): ContactMessage[] {
    try {
      const data = localStorage.getItem(KEYS.MESSAGES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    const sample: ContactMessage[] = [
      {
        id: "msg-1",
        name: "Deepak Raman",
        email: "deepak.raman@tech.in",
        phone: "+91 99620 33441",
        subject: "Pre-wedding shoot in Karaikudi Chettinad houses",
        message: "Hi Aaruthra Studio, we are planning our pre-wedding shoot in late October in Karaikudi. Could you share available dates and recommended attire palettes?",
        preferredContact: "whatsapp",
        createdAt: "2026-08-19T08:20:00.000Z",
        replied: false
      }
    ];
    this.saveMessages(sample);
    return sample;
  },

  saveMessages(messages: ContactMessage[]) {
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
  },

  addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'replied'>): ContactMessage {
    const list = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
      replied: false
    };
    list.unshift(newMsg);
    this.saveMessages(list);
    return newMsg;
  },

  markMessageReplied(id: string) {
    const list = this.getMessages();
    const item = list.find(m => m.id === id);
    if (item) {
      item.replied = true;
      this.saveMessages(list);
    }
  },

  deleteMessage(id: string) {
    const list = this.getMessages().filter(m => m.id !== id);
    this.saveMessages(list);
  },

  // Gallery
  getGallery(): GalleryPhoto[] {
    try {
      const data = localStorage.getItem(KEYS.GALLERY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_GALLERY;
  },

  saveGallery(gallery: GalleryPhoto[]) {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
  },

  addGalleryPhoto(photo: Omit<GalleryPhoto, 'id'>): GalleryPhoto {
    const gallery = this.getGallery();
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: 'gal-' + Date.now()
    };
    gallery.unshift(newPhoto);
    this.saveGallery(gallery);
    return newPhoto;
  },

  deleteGalleryPhoto(id: string) {
    const gallery = this.getGallery().filter(p => p.id !== id);
    this.saveGallery(gallery);
  },

  // Packages
  getPackages(): PackageItem[] {
    try {
      const data = localStorage.getItem(KEYS.PACKAGES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PACKAGES;
  },

  savePackages(packages: PackageItem[]) {
    localStorage.setItem(KEYS.PACKAGES, JSON.stringify(packages));
  },

  updatePackage(pkg: PackageItem) {
    const packages = this.getPackages();
    const idx = packages.findIndex(p => p.id === pkg.id);
    if (idx !== -1) {
      packages[idx] = pkg;
      this.savePackages(packages);
    }
  },

  // Testimonials
  getTestimonials(): TestimonialItem[] {
    try {
      const data = localStorage.getItem(KEYS.TESTIMONIALS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TESTIMONIALS;
  },

  saveTestimonials(testimonials: TestimonialItem[]) {
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  },

  // Cloudinary Config
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

  // Cloudinary Upload helper
  async uploadToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
    const config = this.getCloudinaryConfig();
    if (!config.cloudName || !config.uploadPreset) {
      // If no custom Cloudinary configured, convert to Base64 data URL for local storage preview
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
  },

  // SQL Dump Generator for Django / SQLite / PostgreSQL
  generateSQLDump(): string {
    const bookings = this.getBookings();
    const messages = this.getMessages();
    const gallery = this.getGallery();
    const packages = this.getPackages();

    let sql = `-- AARUTHRA STUDIO SQL DATABASE EXPORT
-- Generated: ${new Date().toISOString()}
-- Compatible with Django models / SQLite / PostgreSQL

-- 1. Table: bookings
CREATE TABLE IF NOT EXISTS studio_booking (
    id VARCHAR(64) PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    event_date DATE NOT NULL,
    event_type VARCHAR(128) NOT NULL,
    package_name VARCHAR(128) NOT NULL,
    venue_location VARCHAR(255) NOT NULL,
    guest_count VARCHAR(64),
    notes TEXT,
    status VARCHAR(32) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    estimated_amount VARCHAR(64)
);

-- 2. Table: contact_messages
CREATE TABLE IF NOT EXISTS studio_contact_message (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    preferred_contact VARCHAR(32) DEFAULT 'whatsapp',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    replied BOOLEAN DEFAULT FALSE
);

-- 3. Table: gallery_photos
CREATE TABLE IF NOT EXISTS studio_gallery_photo (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    category_label VARCHAR(128) NOT NULL,
    location VARCHAR(128) NOT NULL,
    image_url TEXT NOT NULL,
    cloudinary_public_id VARCHAR(255)
);

-- 4. Table: packages
CREATE TABLE IF NOT EXISTS studio_package (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    badge VARCHAR(128),
    description TEXT,
    price VARCHAR(64) NOT NULL,
    price_raw INTEGER NOT NULL,
    duration VARCHAR(128) NOT NULL,
    photographers VARCHAR(255) NOT NULL,
    is_popular BOOLEAN DEFAULT FALSE
);

\n-- INSERT DATA\n`;

    // Bookings inserts
    for (const b of bookings) {
      sql += `INSERT INTO studio_booking (id, client_name, email, phone, event_date, event_type, package_name, venue_location, guest_count, notes, status, created_at, estimated_amount) VALUES ('${b.id}', '${b.clientName.replace(/'/g, "''")}', '${b.email}', '${b.phone}', '${b.eventDate}', '${b.eventType.replace(/'/g, "''")}', '${b.packageName.replace(/'/g, "''")}', '${b.venueLocation.replace(/'/g, "''")}', '${b.guestCount.replace(/'/g, "''")}', '${(b.notes || '').replace(/'/g, "''")}', '${b.status}', '${b.createdAt}', '${b.estimatedAmount || ''}');\n`;
    }

    // Messages inserts
    for (const m of messages) {
      sql += `INSERT INTO studio_contact_message (id, name, email, phone, subject, message, preferred_contact, created_at, replied) VALUES ('${m.id}', '${m.name.replace(/'/g, "''")}', '${m.email}', '${m.phone}', '${m.subject.replace(/'/g, "''")}', '${m.message.replace(/'/g, "''")}', '${m.preferredContact}', '${m.createdAt}', ${m.replied ? 'TRUE' : 'FALSE'});\n`;
    }

    // Gallery inserts
    for (const g of gallery) {
      sql += `INSERT INTO studio_gallery_photo (id, title, category, category_label, location, image_url, cloudinary_public_id) VALUES ('${g.id}', '${g.title.replace(/'/g, "''")}', '${g.category}', '${g.categoryLabel.replace(/'/g, "''")}', '${g.location.replace(/'/g, "''")}', '${g.image}', '${g.cloudinaryPublicId || ''}');\n`;
    }

    // Packages inserts
    for (const p of packages) {
      sql += `INSERT INTO studio_package (id, name, badge, description, price, price_raw, duration, photographers, is_popular) VALUES ('${p.id}', '${p.name.replace(/'/g, "''")}', '${(p.badge || '').replace(/'/g, "''")}', '${p.description.replace(/'/g, "''")}', '${p.price}', ${p.priceRaw}, '${p.duration}', '${p.photographers.replace(/'/g, "''")}', ${p.popular ? 'TRUE' : 'FALSE'});\n`;
    }

    return sql;
  }
};
