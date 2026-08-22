import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Users, 
  Sparkles,
  MessageCircle,
  FileText
} from 'lucide-react';
import { PackageItem, BookingRequest } from '../types';
import { Api } from '../services/api';
import { useStudioData } from '../context/StudioDataContext';

interface BookingCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: PackageItem | null;
}

export const BookingCalendarModal: React.FC<BookingCalendarModalProps> = ({
  isOpen,
  onClose,
  selectedPackage
}) => {
  const { packages, studioInfo } = useStudioData();
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: 'Sacred Muhurtham Wedding',
    packageId: '',
    venueLocation: '',
    guestCount: '300-500 guests',
    notes: ''
  });

  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        packageId: selectedPackage.id
      }));
    } else if (packages.length > 0 && !formData.packageId) {
      setFormData(prev => ({
        ...prev,
        packageId: packages[0].id
      }));
    }
  }, [selectedPackage, packages]);

  if (!isOpen) return null;

  const currentPkg = packages.find(p => p.id === formData.packageId) || packages[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const created = await Api.createBooking({
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate || new Date().toISOString().split('T')[0],
        eventType: formData.eventType,
        packageName: currentPkg?.name || 'The Heritage Classic',
        venueLocation: formData.venueLocation || 'Madurai / Tamil Nadu',
        guestCount: formData.guestCount,
        notes: formData.notes,
        estimatedAmount: currentPkg?.price || '₹1,25,000'
      });

      setSubmittedBooking(created);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    onClose();
  };

  return (
    <div 
      id="booking-modal-overlay"
      className="fixed inset-0 z-[100] bg-[#141211]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="booking-modal-card"
        className="bg-[#FFFFFF] text-[#141211] w-full max-w-2xl rounded-sm border border-[#C5A880]/50 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#141211] text-[#FAF7F2] p-6 sm:p-8 flex items-center justify-between border-b border-[#38271E]">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span className="eyebrow text-[#C5A880] text-xs font-bold">2026 · 2027 Calendar</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
              Check Date & Reserve Coverage
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#23201E] text-[#FAF7F2] hover:text-[#C5A880] transition-colors border border-[#38271E]"
            aria-label="Close Booking Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success View */}
        {submittedBooking ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="font-serif text-3xl text-[#141211] font-medium">
                Availability Request Received!
              </h4>
              <p className="mt-2 text-sm text-[#38271E] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{submittedBooking.clientName}</strong>. We have logged your request for <strong>{submittedBooking.eventDate}</strong> ({submittedBooking.packageName}).
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-sm border border-[#E6DFD5] text-left max-w-md mx-auto text-xs space-y-2">
              <p><strong>Booking ID:</strong> {submittedBooking.id}</p>
              <p><strong>Event:</strong> {submittedBooking.eventType}</p>
              <p><strong>Package:</strong> {submittedBooking.packageName} ({submittedBooking.estimatedAmount})</p>
              <p><strong>Venue:</strong> {submittedBooking.venueLocation}</p>
            </div>

            {/* Instant WhatsApp link for fast contact */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent(`Hello Aaruthra Studio! I just submitted a booking request on your website (ID: ${submittedBooking.id}) for ${submittedBooking.eventDate} (${submittedBooking.packageName}). Please confirm availability.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-sm text-xs flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Now</span>
              </a>

              <button
                onClick={handleReset}
                className="eyebrow bg-[#FAF7F2] hover:bg-[#E6DFD5] text-[#141211] border border-[#E6DFD5] px-6 py-3.5 rounded-sm text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Grid fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Client Name */}
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#A75D3F]" />
                  Your Name / Couple Names *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya & Vignesh"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#A75D3F]" />
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#A75D3F]" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priya.vignesh@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                />
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#A75D3F]" />
                  Wedding / Ceremony Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1.5">
                  Type of Celebration
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                >
                  <option>Sacred Muhurtham Wedding</option>
                  <option>Pre-Wedding & Post-Wedding Story</option>
                  <option>Engagement / Nichayathartham</option>
                  <option>Multi-Day Destination Wedding</option>
                  <option>Family Legacy / Anniversary</option>
                  <option>Temple Ceremony & Nalangu</option>
                </select>
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1.5">
                  Desired Package
                </label>
                <select
                  value={formData.packageId}
                  onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2] font-medium"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Venue & Location */}
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A75D3F]" />
                  Mandapam / City / Venue Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Madurai / Chennai / Kumbakonam"
                  value={formData.venueLocation}
                  onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                />
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#A75D3F]" />
                  Approximate Guest Count
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
                >
                  <option>Intimate (Under 150 guests)</option>
                  <option>Classic (150 - 400 guests)</option>
                  <option>Grand (400 - 800 guests)</option>
                  <option>Royal Heritage (800+ guests)</option>
                </select>
              </div>

            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#141211] mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#A75D3F]" />
                Tell us about your rituals, vision or questions
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific ceremonies (Oonjal, Kasi Yatra, Haldi, Nalangu) or special family wishes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-sm border border-[#E6DFD5] focus:outline-none focus:border-[#C5A880] text-sm bg-[#FAF7F2]"
              ></textarea>
            </div>

            {/* Estimated Summary */}
            <div className="p-4 rounded-sm bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-between">
              <div>
                <span className="eyebrow text-[0.62rem] text-[#A75D3F] font-bold">Selected Collection</span>
                <p className="font-serif text-lg text-[#141211] font-semibold">{currentPkg?.name}</p>
                <p className="text-xs text-[#38271E]">{currentPkg?.duration}</p>
              </div>
              <div className="text-right">
                <span className="eyebrow text-[0.62rem] text-[#38271E]">Estimated Price</span>
                <p className="font-serif text-2xl text-[#A75D3F] font-bold">{currentPkg?.price}</p>
              </div>
            </div>

            {submitError && (
              <p className="text-xs text-rose-600 font-medium">{submitError}</p>
            )}

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-sm border border-[#E6DFD5] text-xs font-semibold text-[#38271E] hover:bg-[#FAF7F2]"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold px-8 py-3.5 rounded-sm text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Checking Availability...' : 'Submit & Check Availability'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};