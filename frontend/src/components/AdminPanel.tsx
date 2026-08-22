import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Image as ImageIcon, 
  DollarSign, 
  Database, 
  Upload, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle, 
  Download, 
  Plus, 
  Cloud, 
  Save, 
  Eye, 
  RefreshCw,
  Search,
  KeyRound
} from 'lucide-react';
import { BookingRequest, ContactMessage, GalleryPhoto, PackageItem, CloudinaryConfig } from '../types';
import { StorageService } from '../services/storage';
import { STUDIO_INFO } from '../data/initialData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  isOpen, 
  onClose,
  onDataUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages' | 'gallery' | 'packages' | 'cloudinary' | 'sql'>('bookings');
  
  // Data States
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [cloudinaryConfig, setCloudinaryConfig] = useState<CloudinaryConfig>(StorageService.getCloudinaryConfig());

  // Search / Filter
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // New Gallery Photo form
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'muhurtham' as GalleryPhoto['category'],
    categoryLabel: 'Sacred Muhurtham',
    location: 'Madurai',
    image: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  // Selected Booking Details modal in admin
  const [viewingBooking, setViewingBooking] = useState<BookingRequest | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = () => {
    setBookings(StorageService.getBookings());
    setMessages(StorageService.getMessages());
    setGallery(StorageService.getGallery());
    setPackages(StorageService.getPackages());
    setCloudinaryConfig(StorageService.getCloudinaryConfig());
  };

  if (!isOpen) return null;

  // Booking handlers
  const handleUpdateBookingStatus = (id: string, status: BookingRequest['status']) => {
    StorageService.updateBookingStatus(id, status);
    loadAllData();
    onDataUpdated();
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm("Are you sure you want to remove this booking request?")) {
      StorageService.deleteBooking(id);
      loadAllData();
      onDataUpdated();
      if (viewingBooking?.id === id) setViewingBooking(null);
    }
  };

  // Message handlers
  const handleMarkReplied = (id: string) => {
    StorageService.markMessageReplied(id);
    loadAllData();
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm("Delete this contact message?")) {
      StorageService.deleteMessage(id);
      loadAllData();
    }
  };

  // Gallery Photo upload handler
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await StorageService.uploadToCloudinary(file);
      setNewPhoto(prev => ({
        ...prev,
        image: result.url
      }));
      setUploadSuccessMsg("Image uploaded successfully!");
      setTimeout(() => setUploadSuccessMsg(''), 3000);
    } catch (err: any) {
      alert("Upload failed: " + (err.message || 'Error'));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddGalleryPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.image) {
      alert("Please provide an image URL or upload a file first.");
      return;
    }

    StorageService.addGalleryPhoto({
      title: newPhoto.title || 'Untitled Photograph',
      category: newPhoto.category,
      categoryLabel: newPhoto.categoryLabel,
      location: newPhoto.location,
      image: newPhoto.image
    });

    setNewPhoto({
      title: '',
      category: 'muhurtham',
      categoryLabel: 'Sacred Muhurtham',
      location: 'Madurai',
      image: ''
    });

    loadAllData();
    onDataUpdated();
    alert("New photo added to the living portfolio!");
  };

  const handleDeletePhoto = (id: string) => {
    if (window.confirm("Remove this photograph from the gallery?")) {
      StorageService.deleteGalleryPhoto(id);
      loadAllData();
      onDataUpdated();
    }
  };

  // Save Cloudinary Config
  const handleSaveCloudinary = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveCloudinaryConfig(cloudinaryConfig);
    alert("Cloudinary configuration saved successfully!");
  };

  // Package edit handler
  const handleUpdatePackagePrice = (pkg: PackageItem, newPrice: string, newPriceRaw: number) => {
    const updated = { ...pkg, price: newPrice, priceRaw: newPriceRaw };
    StorageService.updatePackage(updated);
    loadAllData();
    onDataUpdated();
  };

  // SQL Download
  const handleDownloadSQL = () => {
    const sql = StorageService.generateSQLDump();
    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aaruthra_studio_backup_${new Date().toISOString().split('T')[0]}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const backup = {
      bookings,
      messages,
      gallery,
      packages,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aaruthra_studio_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredBookings = bookings.filter(b => {
    if (bookingFilter !== 'all' && b.status !== bookingFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.clientName.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.venueLocation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div 
      id="admin-portal-modal"
      className="fixed inset-0 z-[110] bg-[#141211]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden animate-in fade-in duration-200"
    >
      <div 
        id="admin-portal-container"
        className="bg-[#FAF7F2] text-[#141211] w-full max-w-7xl h-[94vh] rounded-sm border border-[#C5A880]/60 shadow-2xl flex flex-col overflow-hidden"
      >
        
        {/* Top Header */}
        <div className="bg-[#141211] text-[#FAF7F2] px-6 py-4 border-b border-[#38271E] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#FAF7F2]">
                  Aaruthra Studio Management Portal
                </h2>
                <span className="eyebrow text-[0.62rem] bg-[#C5A880] text-[#141211] px-2 py-0.5 rounded font-bold">
                  Admin
                </span>
              </div>
              <p className="text-xs text-[#E2CFB4]">
                Django REST & SQL Database Manager · Cloudinary Media Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              className="p-2 rounded bg-[#23201E] text-[#E2CFB4] hover:text-white border border-[#38271E] hover:border-[#C5A880] transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded bg-[#23201E] text-[#FAF7F2] hover:text-[#C5A880] border border-[#38271E] transition-colors"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs & Metrics Strip */}
        <div className="bg-[#FFFFFF] border-b border-[#E6DFD5] px-6 py-2 flex flex-wrap items-center justify-between gap-4">
          
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1">
            <button
              id="admin-tab-bookings"
              onClick={() => setActiveTab('bookings')}
              className={`eyebrow text-xs px-4 py-2 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'bookings'
                  ? 'bg-[#141211] text-[#C5A880] font-bold'
                  : 'text-[#38271E] hover:bg-[#FAF7F2]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Bookings ({bookings.length})</span>
            </button>

            <button
              id="admin-tab-messages"
              onClick={() => setActiveTab('messages')}
              className={`eyebrow text-xs px-4 py-2 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'messages'
                  ? 'bg-[#141211] text-[#C5A880] font-bold'
                  : 'text-[#38271E] hover:bg-[#FAF7F2]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquiries ({messages.length})</span>
            </button>

            <button
              id="admin-tab-gallery"
              onClick={() => setActiveTab('gallery')}
              className={`eyebrow text-xs px-4 py-2 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-[#141211] text-[#C5A880] font-bold'
                  : 'text-[#38271E] hover:bg-[#FAF7F2]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Gallery ({gallery.length})</span>
            </button>

            <button
              id="admin-tab-packages"
              onClick={() => setActiveTab('packages')}
              className={`eyebrow text-xs px-4 py-2 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'packages'
                  ? 'bg-[#141211] text-[#C5A880] font-bold'
                  : 'text-[#38271E] hover:bg-[#FAF7F2]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Packages</span>
            </button>

            <button
              id="admin-tab-cloudinary"
              onClick={() => setActiveTab('cloudinary')}
              className={`eyebrow text-xs px-4 py-2 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'cloudinary'
                  ? 'bg-[#141211] text-[#C5A880] font-bold'
                  : 'text-[#38271E] hover:bg-[#FAF7F2]'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>Cloudinary</span>
            </button>

            <button
              id="admin-tab-sql"
              onClick={() => setActiveTab('sql')}
              className={`eyebrow text-xs px-4 py-2 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'sql'
                  ? 'bg-[#141211] text-[#C5A880] font-bold'
                  : 'text-[#38271E] hover:bg-[#FAF7F2]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>SQL / Django Sync</span>
            </button>
          </nav>

          {/* Quick Metrics */}
          <div className="hidden xl:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] rounded border border-[#E6DFD5]">
              <span className="text-[#38271E]">Pending:</span>
              <span className="font-bold text-amber-600">
                {bookings.filter(b => b.status === 'pending').length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] rounded border border-[#E6DFD5]">
              <span className="text-[#38271E]">Confirmed:</span>
              <span className="font-bold text-emerald-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </span>
            </div>
          </div>

        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2]">
          
          {/* 1. BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              
              {/* Search & Filter Toolbar */}
              <div className="bg-[#FFFFFF] p-4 rounded-sm border border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Search className="w-4 h-4 text-[#38271E]" />
                  <input
                    type="text"
                    placeholder="Search client, phone, venue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1.5 border border-[#E6DFD5] rounded text-xs focus:outline-none focus:border-[#C5A880] w-full sm:w-64"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-xs text-[#38271E]">Filter Status:</span>
                  {(['all', 'pending', 'confirmed', 'completed'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setBookingFilter(f)}
                      className={`eyebrow text-[0.62rem] px-3 py-1 rounded capitalize ${
                        bookingFilter === f
                          ? 'bg-[#A75D3F] text-white font-bold'
                          : 'bg-[#FAF7F2] text-[#38271E] border border-[#E6DFD5]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings Table */}
              <div className="bg-[#FFFFFF] rounded-sm border border-[#E6DFD5] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#141211] text-[#FAF7F2] eyebrow text-[0.62rem]">
                      <tr>
                        <th className="p-3.5">Client & Contact</th>
                        <th className="p-3.5">Event Date & Type</th>
                        <th className="p-3.5">Package & Venue</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DFD5]">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-sm text-[#38271E]">
                            No bookings found matching the current filter.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                            
                            <td className="p-3.5">
                              <p className="font-serif text-base font-semibold text-[#141211]">{b.clientName}</p>
                              <p className="text-xs text-[#38271E]">{b.phone}</p>
                              <p className="text-[0.68rem] text-[#A75D3F] truncate max-w-[180px]">{b.email}</p>
                            </td>

                            <td className="p-3.5">
                              <p className="font-bold text-[#141211]">{b.eventDate}</p>
                              <p className="text-xs text-[#38271E]">{b.eventType}</p>
                              <p className="text-[0.68rem] text-muted-foreground">{b.guestCount}</p>
                            </td>

                            <td className="p-3.5">
                              <p className="font-semibold text-[#141211]">{b.packageName}</p>
                              <p className="text-xs text-[#A75D3F] font-bold">{b.estimatedAmount}</p>
                              <p className="text-xs text-[#38271E] truncate max-w-[160px]">{b.venueLocation}</p>
                            </td>

                            <td className="p-3.5">
                              <span className={`inline-block px-2.5 py-1 rounded-full eyebrow text-[0.6rem] font-bold ${
                                b.status === 'confirmed' 
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : b.status === 'pending'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : b.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {b.status}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <div className="flex items-center gap-1.5">
                                {/* View Details */}
                                <button
                                  onClick={() => setViewingBooking(b)}
                                  className="p-1.5 bg-[#FAF7F2] border border-[#E6DFD5] rounded hover:bg-[#C5A880] hover:text-[#141211] transition-colors"
                                  title="View Full Booking Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Direct WhatsApp Client */}
                                <a
                                  href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.clientName}, this is Aaruthra Studio regarding your wedding booking request for ${b.eventDate}. We would be delighted to cover your sacred celebration!`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/40 rounded hover:bg-[#25D366] hover:text-white transition-colors"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>

                                {/* Status toggles */}
                                {b.status === 'pending' && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                                    className="px-2 py-1 bg-emerald-600 text-white rounded text-[0.62rem] font-semibold hover:bg-emerald-700"
                                    title="Confirm Booking"
                                  >
                                    Confirm
                                  </button>
                                )}

                                {b.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                                    className="px-2 py-1 bg-blue-600 text-white rounded text-[0.62rem] font-semibold hover:bg-blue-700"
                                    title="Mark Completed"
                                  >
                                    Complete
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDeleteBooking(b.id)}
                                  className="p-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded hover:bg-rose-600 hover:text-white transition-colors"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* 2. MESSAGES & INQUIRIES TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#141211]">Client Inquiries & Contact Log</h3>
                <span className="text-xs text-[#38271E]">{messages.length} total inquiries logged</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.map((m) => (
                  <div key={m.id} className="bg-[#FFFFFF] p-5 rounded-sm border border-[#E6DFD5] shadow-sm flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-lg font-bold text-[#141211]">{m.name}</span>
                        <span className="text-[0.65rem] text-[#38271E]">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs text-[#38271E] mb-3">
                        <p><strong>Phone:</strong> {m.phone}</p>
                        <p><strong>Email:</strong> {m.email}</p>
                        <p><strong>Subject:</strong> {m.subject}</p>
                        <p className="text-emerald-700"><strong>Preferred Mode:</strong> {m.preferredContact}</p>
                      </div>

                      <div className="bg-[#FAF7F2] p-3 rounded border border-[#E6DFD5] text-xs text-[#141211] italic leading-relaxed">
                        “{m.message}”
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E6DFD5] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${m.name}, thank you for contacting Aaruthra Studio regarding "${m.subject}". How can we assist you?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#25D366] text-white rounded text-xs font-semibold flex items-center gap-1 shadow"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Reply</span>
                        </a>

                        <a
                          href={`mailto:${m.email}?subject=Re:%20${encodeURIComponent(m.subject)}&body=Hello%20${encodeURIComponent(m.name)},%0A%0AThank%20you%20for%20contacting%20Aaruthra%20Studio...`}
                          className="px-3 py-1.5 bg-[#141211] text-white rounded text-xs font-semibold flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. GALLERY & CLOUDINARY UPLOAD TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              
              {/* Add Photo Card */}
              <div className="bg-[#FFFFFF] p-6 rounded-sm border border-[#E6DFD5] shadow-sm">
                <h3 className="font-serif text-2xl text-[#141211] font-semibold mb-1 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#C5A880]" />
                  Add Photo to Living Portfolio
                </h3>
                <p className="text-xs text-[#38271E] mb-6">
                  Upload directly via Cloudinary storage or enter an image URL with metadata.
                </p>

                <form onSubmit={handleAddGalleryPhoto} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div>
                      <label className="block text-xs font-semibold text-[#141211] mb-1">Photo Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Muhurtham Bliss"
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                        className="w-full px-3 py-2 border border-[#E6DFD5] rounded text-xs focus:outline-none focus:border-[#C5A880] bg-[#FAF7F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#141211] mb-1">Category</label>
                      <select
                        value={newPhoto.category}
                        onChange={(e) => {
                          const cat = e.target.value as any;
                          const labels: Record<string, string> = {
                            muhurtham: 'Sacred Muhurtham',
                            couples: 'Couples & Pre-Wedding',
                            rituals: 'Rituals & Traditions',
                            portraits: 'Portraits & Heirloom'
                          };
                          setNewPhoto({
                            ...newPhoto,
                            category: cat,
                            categoryLabel: labels[cat] || 'Ceremonies'
                          });
                        }}
                        className="w-full px-3 py-2 border border-[#E6DFD5] rounded text-xs focus:outline-none focus:border-[#C5A880] bg-[#FAF7F2]"
                      >
                        <option value="muhurtham">Sacred Muhurtham</option>
                        <option value="couples">Couples & Pre-Wedding</option>
                        <option value="rituals">Rituals & Traditions</option>
                        <option value="portraits">Portraits & Heirloom</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#141211] mb-1">Location / City</label>
                      <input
                        type="text"
                        placeholder="e.g. Madurai / Thanjavur"
                        value={newPhoto.location}
                        onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                        className="w-full px-3 py-2 border border-[#E6DFD5] rounded text-xs focus:outline-none focus:border-[#C5A880] bg-[#FAF7F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#141211] mb-1">
                        Cloudinary / Local File Upload
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                        className="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:bg-[#141211] file:text-[#C5A880] hover:file:bg-[#38271E]"
                      />
                    </div>

                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#141211] mb-1">Image URL / Path</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. /assets/p1-C0m4BKDV.jpg or https://res.cloudinary.com/..."
                      value={newPhoto.image}
                      onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E6DFD5] rounded text-xs focus:outline-none focus:border-[#C5A880] bg-[#FAF7F2]"
                    />
                  </div>

                  {uploadSuccessMsg && (
                    <p className="text-xs text-emerald-600 font-semibold">{uploadSuccessMsg}</p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={uploadingImage}
                      className="eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold px-6 py-2.5 rounded text-xs flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Save Photograph'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Items List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-[#FFFFFF] border border-[#E6DFD5] rounded overflow-hidden group relative flex flex-col justify-between">
                    <div className="relative aspect-square bg-[#141211]">
                      <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeletePhoto(g.id)}
                        className="absolute top-1.5 right-1.5 p-1.5 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                        title="Delete from gallery"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="p-2 text-xs">
                      <p className="font-semibold text-[#141211] truncate">{g.title}</p>
                      <p className="text-[0.65rem] text-[#A75D3F]">{g.categoryLabel}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 4. PACKAGES & PRICING EDITOR */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-[#141211]">Packages & Investment Rates</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-[#FFFFFF] p-6 rounded-sm border border-[#E6DFD5] shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-xl font-bold text-[#141211]">{pkg.name}</h4>
                      {pkg.popular && (
                        <span className="eyebrow text-[0.6rem] bg-[#C5A880] text-[#141211] font-bold px-2 py-0.5 rounded">
                          POPULAR
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#38271E]">{pkg.description}</p>

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#141211] mb-1">Display Price</label>
                        <input
                          type="text"
                          defaultValue={pkg.price}
                          onBlur={(e) => {
                            const raw = parseInt(e.target.value.replace(/[^0-9]/g, '')) || pkg.priceRaw;
                            handleUpdatePackagePrice(pkg, e.target.value, raw);
                          }}
                          className="w-full px-3 py-1.5 border border-[#E6DFD5] rounded text-xs bg-[#FAF7F2]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#141211] mb-1">Duration & Inclusions</label>
                        <p className="text-xs text-[#38271E] font-medium">{pkg.duration}</p>
                        <p className="text-xs text-[#38271E] mt-1">{pkg.photographers}</p>
                      </div>

                      <div className="pt-2 text-xs text-muted-foreground">
                        <p className="font-semibold text-[#141211] mb-1">Includes:</p>
                        <ul className="list-disc list-inside space-y-0.5 text-[0.72rem]">
                          {pkg.inclusions.slice(0, 3).map((inc, i) => (
                            <li key={i}>{inc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. CLOUDINARY CONFIGURATION TAB */}
          {activeTab === 'cloudinary' && (
            <div className="max-w-2xl bg-[#FFFFFF] p-8 rounded-sm border border-[#E6DFD5] shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <Cloud className="w-8 h-8 text-[#C5A880]" />
                <div>
                  <h3 className="font-serif text-2xl text-[#141211]">Cloudinary Storage Integration</h3>
                  <p className="text-xs text-[#38271E]">
                    Connect your Cloudinary account for high-resolution cloud photo hosting and responsive CDN delivery.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveCloudinary} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">Cloud Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. aaruthra-studio"
                    value={cloudinaryConfig.cloudName}
                    onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, cloudName: e.target.value })}
                    className="w-full px-3.5 py-2 border border-[#E6DFD5] rounded text-xs bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">Upload Preset (Unsigned)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. wedding_gallery"
                    value={cloudinaryConfig.uploadPreset}
                    onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, uploadPreset: e.target.value })}
                    className="w-full px-3.5 py-2 border border-[#E6DFD5] rounded text-xs bg-[#FAF7F2]"
                  />
                  <p className="text-[0.68rem] text-muted-foreground mt-1">
                    Create an unsigned upload preset in your Cloudinary Settings &gt; Upload.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">API Key (Optional)</label>
                  <input
                    type="password"
                    placeholder="Optional API Key for Django backend sync"
                    value={cloudinaryConfig.apiKey || ''}
                    onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, apiKey: e.target.value })}
                    className="w-full px-3.5 py-2 border border-[#E6DFD5] rounded text-xs bg-[#FAF7F2]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="submit"
                    className="eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold px-6 py-2.5 rounded text-xs flex items-center gap-2 shadow"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Cloudinary Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 6. SQL DATABASE & DJANGO SYNC TAB */}
          {activeTab === 'sql' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#141211]">SQL Database & Django Synchronization</h3>
                  <p className="text-xs text-[#38271E]">
                    Export live SQLite/PostgreSQL DDL scripts, insert statements, or JSON dumps for Django integration.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadSQL}
                    className="eyebrow bg-[#141211] hover:bg-[#38271E] text-[#C5A880] font-bold px-4 py-2 rounded text-xs flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export SQL Dump</span>
                  </button>

                  <button
                    onClick={handleDownloadJSON}
                    className="eyebrow bg-[#A75D3F] hover:bg-[#8e4c32] text-white font-bold px-4 py-2 rounded text-xs flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>

              {/* SQL Schema Preview Box */}
              <div className="bg-[#141211] text-[#FAF7F2] p-6 rounded-sm border border-[#38271E] font-mono text-xs overflow-x-auto max-h-[55vh]">
                <pre>{StorageService.generateSQLDump()}</pre>
              </div>

              {/* Django instructions */}
              <div className="bg-[#FFFFFF] p-5 rounded-sm border border-[#E6DFD5] text-xs space-y-2">
                <p className="font-bold text-[#141211]">Django Quickstart Instructions:</p>
                <p>1. Run <code>python manage.py makemigrations</code> to initialize tables.</p>
                <p>2. Run <code>python manage.py migrate</code> to generate the SQLite database.</p>
                <p>3. Run <code>python manage.py runserver 8000</code> to launch the Django REST backend.</p>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Booking View Details Modal */}
      {viewingBooking && (
        <div 
          className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setViewingBooking(null)}
        >
          <div 
            className="bg-white text-[#141211] w-full max-w-lg p-6 rounded-sm border border-[#C5A880] shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-xl font-bold">Booking #{viewingBooking.id}</h3>
              <button onClick={() => setViewingBooking(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p><strong>Client:</strong> {viewingBooking.clientName}</p>
              <p><strong>Email:</strong> {viewingBooking.email}</p>
              <p><strong>Phone:</strong> {viewingBooking.phone}</p>
              <p><strong>Event Date:</strong> {viewingBooking.eventDate}</p>
              <p><strong>Event Type:</strong> {viewingBooking.eventType}</p>
              <p><strong>Package:</strong> {viewingBooking.packageName} ({viewingBooking.estimatedAmount})</p>
              <p><strong>Venue:</strong> {viewingBooking.venueLocation}</p>
              <p><strong>Guest Count:</strong> {viewingBooking.guestCount}</p>
              <p><strong>Notes:</strong> {viewingBooking.notes || 'None'}</p>
              <p><strong>Status:</strong> <span className="font-bold uppercase text-amber-700">{viewingBooking.status}</span></p>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                onClick={() => setViewingBooking(null)}
                className="px-4 py-2 bg-gray-200 text-xs rounded font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
