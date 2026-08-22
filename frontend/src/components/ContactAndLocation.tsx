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
import { useStudioData } from '../context/StudioDataContext';
import { Api } from '../services/api';

export const ContactAndLocation: React.FC = () => {
  const { studioInfo } = useStudioData();
  const [msgForm, setMsgForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'email' | 'call'
  });

  const [sentSuccess, setSentSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);
    try {
      await Api.createMessage({
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
    } catch (err: any) {
      console.error(err);
      setSendError(err?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#FAF7F2] text-[#141211] border-t border-[#E6DFD5]">
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
            href={`https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent("Hello Aaruthra Studio! I would like to inquire about wedding photography packages.")}`}
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
              <p className="text-xs text-[#38271E] mt-0.5 font-medium">{studioInfo.phone}</p>
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            id="contact-btn-call"
            href={`tel:${studioInfo.phone}`}
            className="p-6 rounded-sm bg-[#FFFFFF] border border-[#C5A880]/50 hover:border-[#C5A880] shadow-sm hover:shadow-lg transition-all flex items-start gap-4 group"
          >
            <div className="p-3 rounded-full bg-[#C5A880]/15 text-[#A75D3F] group-hover:bg-[#C5A880] group-hover:text-[#141211] transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="eyebrow text-[0.62rem] text-[#A75D3F] font-bold">Direct Call</span>
              <h3 className="font-serif text-lg text-[#141211] font-semibold">Phone Line</h3>
              <p className="text-xs text-[#38271E] mt-0.5 font-medium">{studioInfo.phone}</p>
            </div>
          </a>

          {/* Direct Email */}
          <a
            id="contact-btn-email"
            href={`mailto:${studioInfo.email}?subject=Wedding%20Photography%20Inquiry%20-%20Aaruthra%20Studio&body=Hello%20Aaruthra%20Studio,%0A%0AI%20would%20like%20to%20inquire%20about%20availability%20for%20our%20upcoming%20wedding...`}
            className="p-6 rounded-sm bg-[#FFFFFF] border border-[#E6DFD5] hover:border-[#A75D3F] shadow-sm hover:shadow-lg transition-all flex items-start gap-4 group"
          >
            <div className="p-3 rounded-full bg-[#FAF7F2] text-[#A75D3F] group-hover:bg-[#A75D3F] group-hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="eyebrow text-[0.62rem] text-[#A75D3F] font-bold">Inquiry Email</span>
              <h3 className="font-serif text-lg text-[#141211] font-semibold">Write to Us</h3>
              <p className="text-xs text-[#38271E] mt-0.5 font-medium truncate max-w-[140px]">{studioInfo.email}</p>
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
                  <p className="font-semibold text-sm">Message Sent Successfully!</p>
                  <p className="text-xs mt-0.5">We will reach out to you shortly via your preferred contact method.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#141211] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sundaram"
                      value={msgForm.name}
                      onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#141211] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={msgForm.phone}
                      onChange={(e) => setMsgForm({ ...msgForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={msgForm.email}
                    onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Wedding photography inquiry for Feb 2027"
                    value={msgForm.subject}
                    onChange={(e) => setMsgForm({ ...msgForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">Preferred Contact Method</label>
                  <div className="flex gap-2">
                    {(['whatsapp', 'email', 'call'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setMsgForm({ ...msgForm, preferredContact: mode })}
                        className={`flex-1 eyebrow text-[0.65rem] py-2 rounded-sm capitalize font-semibold transition-colors ${
                          msgForm.preferredContact === mode
                            ? 'bg-[#C5A880] text-[#141211]'
                            : 'bg-[#FAF7F2] text-[#38271E] border border-[#E6DFD5]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
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

                {sendError && (
                  <p className="text-xs text-rose-600 font-medium">{sendError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold py-3.5 px-6 rounded-sm text-xs transition-all shadow flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSending ? 'Sending…' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Google Maps + Studio Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="rounded-sm overflow-hidden border border-[#E6DFD5] shadow-sm flex-1 min-h-[280px] relative">
              <iframe
                title="Aaruthra Studio Location"
                src={studioInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '280px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            <div className="bg-[#141211] text-[#FAF7F2] p-6 sm:p-8 rounded-sm border border-[#38271E]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-semibold">Studio Address</h4>
                  <span>{studioInfo.address}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#38271E] flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-semibold">Studio Hours</h4>
                  <p className="text-xs text-[#E2CFB4] mt-1">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  <p className="text-xs text-[#E2CFB4]">Sunday: By Appointment Only</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent("Hello! I have an urgent wedding date inquiry for Aaruthra Studio.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold eyebrow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Directions & Chat Now</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};