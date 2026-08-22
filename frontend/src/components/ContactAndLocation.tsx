import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { STUDIO_INFO } from '../data/initialData';
import { StorageService } from '../services/storage';

export const ContactAndLocation: React.FC = () => {
  const [msgForm, setMsgForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'email' | 'call'
  });

  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      StorageService.addMessage({
        name: msgForm.name,
        email: msgForm.email,
        phone: msgForm.phone,
        subject: msgForm.subject || 'Wedding Inquiry',
        message: msgForm.message,
        preferredContact: msgForm.preferredContact
      });
      setSentSuccess(true);
      setMsgForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'whatsapp'
      });
      setTimeout(() => setSentSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FAF7F2] text-[#141211] border-t border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#A75D3F]" />
            <span className="eyebrow text-[#A75D3F] font-bold">Connect With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#141211] leading-tight">
            Let's Talk About Your <span className="italic text-[#A75D3F]">Celebration</span>
          </h2>
          <p className="mt-4 font-sans text-base text-[#38271E] font-medium leading-relaxed">
            Whether you are planning an intimate temple Muhurtham or a grand multi-day destination wedding, we would love to hear your vision.
          </p>
        </div>

        {/* 4 Direct Integrations Bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Direct WhatsApp */}
          <a
            id="contact-btn-whatsapp"
            href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Aaruthra Studio! I would like to inquire about wedding photography packages.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-sm bg-[#FFFFFF] border border-[#25D366]/40 hover:border-[#25D366] shadow-sm hover:shadow-lg transition-all flex items-start gap-4 group"
          >
            <div className="p-3 rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="eyebrow text-[0.62rem] text-[#25D366] font-bold">Instant Chat</span>
              <h3 className="font-serif text-lg text-[#141211] font-semibold">WhatsApp Direct</h3>
              <p className="text-xs text-[#38271E] mt-0.5 font-medium">+91 98765 43210</p>
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            id="contact-btn-call"
            href={`tel:${STUDIO_INFO.phone}`}
            className="p-6 rounded-sm bg-[#FFFFFF] border border-[#C5A880]/50 hover:border-[#C5A880] shadow-sm hover:shadow-lg transition-all flex items-start gap-4 group"
          >
            <div className="p-3 rounded-full bg-[#C5A880]/15 text-[#A75D3F] group-hover:bg-[#C5A880] group-hover:text-[#141211] transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="eyebrow text-[0.62rem] text-[#A75D3F] font-bold">Direct Call</span>
              <h3 className="font-serif text-lg text-[#141211] font-semibold">Phone Line</h3>
              <p className="text-xs text-[#38271E] mt-0.5 font-medium">{STUDIO_INFO.phone}</p>
            </div>
          </a>

          {/* Direct Email */}
          <a
            id="contact-btn-email"
            href={`mailto:${STUDIO_INFO.email}?subject=Wedding%20Photography%20Inquiry%20-%20Aaruthra%20Studio&body=Hello%20Aaruthra%20Studio,%0A%0AI%20would%20like%20to%20inquire%20about%20availability%20for%20our%20upcoming%20wedding...`}
            className="p-6 rounded-sm bg-[#FFFFFF] border border-[#E6DFD5] hover:border-[#A75D3F] shadow-sm hover:shadow-lg transition-all flex items-start gap-4 group"
          >
            <div className="p-3 rounded-full bg-[#FAF7F2] text-[#A75D3F] group-hover:bg-[#A75D3F] group-hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="eyebrow text-[0.62rem] text-[#A75D3F] font-bold">Inquiry Email</span>
              <h3 className="font-serif text-lg text-[#141211] font-semibold">Write to Us</h3>
              <p className="text-xs text-[#38271E] mt-0.5 font-medium truncate max-w-[140px]">{STUDIO_INFO.email}</p>
            </div>
          </a>

          {/* Studio Location */}
          <a
            id="contact-btn-map"
            href="https://maps.google.com/?q=Madurai,Tamil+Nadu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-sm bg-[#FFFFFF] border border-[#E6DFD5] hover:border-[#A75D3F] shadow-sm hover:shadow-lg transition-all flex items-start gap-4 group"
          >
            <div className="p-3 rounded-full bg-[#FAF7F2] text-[#A75D3F] group-hover:bg-[#A75D3F] group-hover:text-white transition-colors">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="eyebrow text-[0.62rem] text-[#A75D3F] font-bold">Studio Visit</span>
              <h3 className="font-serif text-lg text-[#141211] font-semibold">Madurai Studio</h3>
              <p className="text-xs text-[#38271E] mt-0.5 font-medium">Near Meenakshi Temple</p>
            </div>
          </a>

        </div>

        {/* Main 2-Column: Interactive Form + Google Maps Embed */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Contact Inquiry Form */}
          <div className="lg:col-span-6 bg-[#FFFFFF] p-8 sm:p-10 rounded-sm border border-[#E6DFD5] shadow-sm">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#141211] font-semibold">
              Send Direct Message
            </h3>
            <p className="text-xs text-[#38271E] mt-1 font-normal">
              We respond within 24 hours with package catalogs and date availability.
            </p>

            {sentSuccess ? (
              <div className="mt-6 p-6 rounded-sm bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Message Sent Successfully!</p>
                  <p className="text-xs mt-0.5">We will reach out to you via your preferred contact mode shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#141211] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={msgForm.name}
                      onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#141211] mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98401 22334"
                      value={msgForm.phone}
                      onChange={(e) => setMsgForm({ ...msgForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#141211] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@gmail.com"
                      value={msgForm.email}
                      onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#141211] mb-1">Preferred Response Mode</label>
                    <select
                      value={msgForm.preferredContact}
                      onChange={(e) => setMsgForm({ ...msgForm, preferredContact: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                    >
                      <option value="whatsapp">WhatsApp Message</option>
                      <option value="call">Phone Call</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">Subject / Event Type</label>
                  <input
                    type="text"
                    placeholder="e.g. December Wedding in Madurai / Pre-wedding inquiry"
                    value={msgForm.subject}
                    onChange={(e) => setMsgForm({ ...msgForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the dates, venue, or any specific questions..."
                    value={msgForm.message}
                    onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold py-3.5 px-6 rounded-sm text-xs transition-all shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}

          </div>

          {/* Google Maps & Studio Info Card */}
          <div className="lg:col-span-6 bg-[#FFFFFF] rounded-sm border border-[#E6DFD5] shadow-sm overflow-hidden flex flex-col justify-between">
            
            {/* Embedded Google Map */}
            <div className="relative h-64 sm:h-72 w-full bg-[#141211]">
              <iframe
                title="Aaruthra Studio Location Map"
                src={STUDIO_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-110"
              ></iframe>
              <div className="absolute top-3 right-3">
                <a
                  href="https://maps.google.com/?q=Madurai,Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow bg-[#141211]/90 hover:bg-[#141211] text-[#C5A880] text-[0.62rem] font-bold px-3 py-1.5 rounded-sm border border-[#C5A880]/40 flex items-center gap-1.5 shadow"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Studio Info Details */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h4 className="font-serif text-2xl text-[#141211] font-semibold">
                  Studio Headquarters
                </h4>
                <p className="text-xs text-[#38271E] mt-1 flex items-start gap-2 font-medium">
                  <MapPin className="w-4 h-4 text-[#A75D3F] shrink-0 mt-0.5" />
                  <span>{STUDIO_INFO.address}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6DFD5] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#38271E]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#A75D3F]" />
                  <span>Mon – Sun: 9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#A75D3F]" />
                  <span>Consultations by Appointment</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6DFD5] flex items-center justify-between">
                <span className="eyebrow text-xs text-[#141211] font-bold">Have an urgent inquiry?</span>
                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent("Hello! I have an urgent wedding date inquiry for Aaruthra Studio.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-sm text-[0.68rem] font-bold flex items-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
