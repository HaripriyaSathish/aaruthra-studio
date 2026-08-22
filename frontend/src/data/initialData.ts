import { StoryItem, ServiceItem, GalleryPhoto, PackageItem, TestimonialItem, CloudinaryConfig } from '../types';

export const STUDIO_INFO = {
  name: "Aaruthra Studio",
  tagline: "South Indian Wedding & Heritage Photography",
  leadPhotographer: "Aaruthra Selvan",
  establishedYear: "2012",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210",
  email: "contact@aaruthrastudio.com",
  address: "14, West Veli Street, Near Meenakshi Amman Temple, Madurai, Tamil Nadu 625001",
  mapCoordinates: {
    lat: 9.9195,
    lng: 78.1193
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15720.916805623058!2d78.1102927236121!3d9.919532585149363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63933!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  socials: {
    instagram: "https://instagram.com/aaruthra_studio",
    facebook: "https://facebook.com/aaruthrastudio",
    youtube: "https://youtube.com/@aaruthrastudio"
  },
  stats: [
    { label: "Years Behind The Lens", value: "14+" },
    { label: "Weddings Photographed", value: "480+" },
    { label: "Stories Archived", value: "1,250+" },
    { label: "Client Satisfaction", value: "100%" }
  ]
};

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: "story-1",
    title: "The Sacred Muhurtham of Preethi & Vignesh",
    subtitle: "A traditional Tamil wedding bathed in dawn light and ancestral mantras",
    category: "Traditional Wedding",
    location: "Meenakshi Kalyana Mandapam, Madurai",
    image: "/assets/story-wedding-CUUGaQRS.jpg",
    description: "Every ritual unfolded with reverence — the Mangalya Dharanam amidst the resonant nadaswaram, the tender pouring of the akshatai, and quiet glances between families tied together for generations.",
    rituals: ["Kasi Yatra", "Oonjal Swing", "Mangalya Dharanam", "Saptapadi"]
  },
  {
    id: "story-2",
    title: "Golden Hour in Kumbakonam",
    subtitle: "Pre-wedding celebration amidst heritage temple towers and quiet backwaters",
    category: "Pre-Wedding",
    location: "Heritage Illam, Kumbakonam",
    image: "/assets/story-celebration-7MlJ-U4h.jpg",
    description: "Far from rehearsed poses, this story captured pure laughter in ancestral corridors, soft evening winds through coconut groves, and the unspoken warmth of two hearts starting a lifelong journey.",
    rituals: ["Temple Walk", "Heritage Courtyard", "Sunset By The River"]
  },
  {
    id: "story-3",
    title: "Echoes of Thanjavur: Priya & Arvind",
    subtitle: "A royal celebration honoring Chola architectural grandeur and deep familial bonds",
    category: "Couple Story",
    location: "Brahadeeswara Corridor, Thanjavur",
    image: "/assets/story-couple-BOu6xqHR.jpg",
    description: "Against the timeless stone pillars and bronze oil lamps, Priya and Arvind celebrated their vows with graceful handloom silks and soulful moments that will remain evergreen for decades.",
    rituals: ["Nalangu Fun", "Maalai Maatral", "Aarthi Blessing"]
  },
  {
    id: "story-4",
    title: "Four Generations Under One Roof",
    subtitle: "A multi-generational family portrait in the ancestral Chettinad courtyard",
    category: "Family Heritage",
    location: "Chettinad Mansion, Karaikudi",
    image: "/assets/story-family-DuOaNlYr.jpg",
    description: "Grandparents, great-grandchildren, brass vessels and handmade athangudi tiles. We documented an heirloom legacy that holds the love of four generations in a single frame.",
    rituals: ["Sadhabishekam", "Family Blessings", "Ancestral Feast"]
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "service-wedding",
    title: "Wedding Photography",
    subtitle: "Every ritual, emotion, and celebration captured naturally.",
    description: "Comprehensive coverage of your sacred Muhurtham, reception, and intimate ceremonies. We stay discreet, capturing candid tears, joyous laughter, and the sacred fire rituals with cinematic finesse.",
    image: "/assets/p1-C0m4BKDV.jpg",
    startingPrice: "₹75,000",
    features: [
      "Full Muhurtham & Reception Coverage",
      "Traditional & Candid Photography Team",
      "Color-Graded High-Resolution Images",
      "Handcrafted Leather Album Included",
      "Private Online Gallery for 1 Year"
    ]
  },
  {
    id: "service-prewedding",
    title: "Pre-Wedding Stories",
    subtitle: "Relaxed, intimate, and cinematic couple portraits.",
    description: "A serene session in scenic heritage locations, temple corridors, or lush plantations across South India, allowing you to be completely yourselves without the rush of the wedding day.",
    image: "/assets/p2-T4ESD4pN.jpg",
    startingPrice: "₹35,000",
    features: [
      "Half-day or Full-day Shoot",
      "2-3 Curated Heritage Locations",
      "Styling & Moodboard Assistance",
      "50 Masterfully Retouched Portraits",
      "Teaser Slideshow for Wedding Display"
    ]
  },
  {
    id: "service-couple",
    title: "Couple Photography",
    subtitle: "Authentic moments and natural, unforced emotions.",
    description: "Timeless portraiture designed to reflect your unique connection. We blend natural light with architectural compositions to create artwork suited for wall frames and heirlooms.",
    image: "/assets/p3-DO97u8AW.jpg",
    startingPrice: "₹28,000",
    features: [
      "Natural Light Sunset & Dawn Sessions",
      "Unposed Candid Expressions",
      "Fine-Art Archival Prints",
      "Multiple Attire Changes",
      "High-Resolution Digital Delivery"
    ]
  },
  {
    id: "service-rituals",
    title: "Traditional Ceremonies",
    subtitle: "Capturing cultural rituals with meticulous attention to detail.",
    description: "From Nalangu, Nichayathartham (Engagement), and Haldi to Seemantham and Valaikaappu. We understand the spiritual importance of every pooja and familial blessing.",
    image: "/assets/p4-Da7hQ8sz.jpg",
    startingPrice: "₹40,000",
    features: [
      "Ritual-Aware Lead Photographers",
      "Macro Shots of Ornaments & Flowers",
      "Family Blessing Group Frames",
      "Same-Week Preview Gallery",
      "Printable Archival Book"
    ]
  },
  {
    id: "service-family",
    title: "Family Portraits",
    subtitle: "Timeless heirlooms preserved for future generations.",
    description: "Commemorate landmark milestones, 60th/80th wedding anniversaries (Sashtiabdhapoorthi & Sadhabishekam), and large family reunions in your home or heritage venue.",
    image: "/assets/p5-BPI7fvRl.jpg",
    startingPrice: "₹30,000",
    features: [
      "Multi-Generation Framing",
      "At-Home Comfort or Studio Session",
      "Individual & Sub-Family Portraits",
      "Museum-Grade Canvas Print",
      "Full Digital Archive"
    ]
  },
  {
    id: "service-events",
    title: "Celebrations & Festivities",
    subtitle: "Vibrant coverage of meaningful cultural celebrations.",
    description: "Sangeet nights, Temple festivals, Housewarmings (Gruhapravesam), and Arangetram events covered with dynamic lighting and soulful storytelling.",
    image: "/assets/p6-CsFoVe34.jpg",
    startingPrice: "₹45,000",
    features: [
      "High-Energy Candid Moments",
      "Traditional Stage & Ambiance Coverage",
      "Fast 48-Hour Highlight Delivery",
      "Video Highlight Teaser Option",
      "Unlimited High-Res Downloads"
    ]
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Bridal Splendor in Kanchipuram Silk",
    category: "portraits",
    categoryLabel: "Bridal Portrait",
    location: "Madurai",
    image: "/assets/p1-C0m4BKDV.jpg"
  },
  {
    id: "gal-2",
    title: "Sacred Oonjal Swing Ceremony",
    category: "rituals",
    categoryLabel: "Oonjal Ritual",
    location: "Thanjavur",
    image: "/assets/p2-T4ESD4pN.jpg"
  },
  {
    id: "gal-3",
    title: "Joyous Nalangu Turmeric Celebrations",
    category: "rituals",
    categoryLabel: "Nalangu",
    location: "Tirunelveli",
    image: "/assets/p3-DO97u8AW.jpg"
  },
  {
    id: "gal-4",
    title: "Temple Corridor Romance at Twilight",
    category: "couples",
    categoryLabel: "Pre-Wedding",
    location: "Kumbakonam",
    image: "/assets/p4-Da7hQ8sz.jpg"
  },
  {
    id: "gal-5",
    title: "The Mangalya Dharanam Sacred Moment",
    category: "muhurtham",
    categoryLabel: "Muhurtham",
    location: "Madurai",
    image: "/assets/p5-BPI7fvRl.jpg"
  },
  {
    id: "gal-6",
    title: "Ancestral Blessings & Akshatai",
    category: "muhurtham",
    categoryLabel: "Muhurtham",
    location: "Coimbatore",
    image: "/assets/p6-CsFoVe34.jpg"
  },
  {
    id: "gal-7",
    title: "Groom's Kasi Yatra & Brass Lamp Radiance",
    category: "rituals",
    categoryLabel: "Kasi Yatra",
    location: "Chennai",
    image: "/assets/p7-Cq29oym-.jpg"
  },
  {
    id: "gal-8",
    title: "Quiet Smiles in Chettinad Veranda",
    category: "couples",
    categoryLabel: "Heritage Couple",
    location: "Karaikudi",
    image: "/assets/p8-DQHQXewJ.jpg"
  }
];

export const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: "pkg-essential",
    name: "The Intimate Celebration",
    badge: "For Single-Day Events",
    description: "Thoughtfully designed for intimate temple weddings, register ceremonies, or one-day family celebrations.",
    price: "₹65,000",
    priceRaw: 65000,
    duration: "1 Day (Up to 8 Hours)",
    photographers: "1 Senior Candid & 1 Traditional Photographer",
    inclusions: [
      "One full day coverage of rituals and reception",
      "Careful selection of 300+ edited photographs",
      "High-resolution digital archive via private gallery",
      "Highlight teaser slideshow within 7 days",
      "Print release for unlimited personal printing"
    ],
    deliverables: [
      "300+ Color-graded High-Res Photos",
      "Digital Cloud Drive with 5-year access",
      "Mobile-ready highlight album"
    ],
    popular: false
  },
  {
    id: "pkg-heritage",
    name: "The Heritage Classic",
    badge: "Most Cherished Choice",
    description: "Our signature full wedding coverage. Covers both Muhurtham and Reception with two senior visual storytellers.",
    price: "₹1,25,000",
    priceRaw: 125000,
    duration: "2 Days (Muhurtham + Reception + Nalangu)",
    photographers: "2 Senior Candid Photographers + 1 Traditional Specialist",
    inclusions: [
      "Complete multi-session coverage (Muhurtham, Reception, Haldi)",
      "650+ Masterfully retouched high-resolution images",
      "1 Handcrafted 35-page Fine Art Leather Album",
      "Complimentary Mini Pre-Wedding Portrait Session",
      "Drone aerial perspective (venue & grand entrance)"
    ],
    deliverables: [
      "650+ Masterfully retouched photographs",
      "Handmade 35-page archival Italian leather album",
      "2 Parent mini replica albums",
      "Cinematic photo reel for Instagram"
    ],
    popular: true
  },
  {
    id: "pkg-legacy",
    name: "The Royal Heirloom Legacy",
    badge: "Grand Multi-Day & Films",
    description: "The complete visual legacy for grand South Indian celebrations. Includes full cinematography film and heirloom albums.",
    price: "₹2,40,000",
    priceRaw: 240000,
    duration: "3+ Days (Full Wedding Week Coverage)",
    photographers: "Full Photo & Cinema Crew (4 Photographers + 2 Cinematographers)",
    inclusions: [
      "Unlimited coverage of all rituals, Sangeet, Muhurtham & Reception",
      "Full Cinema Wedding Film (3-5 min teaser + 25-35 min feature)",
      "Complete pre-wedding narrative film at heritage destination",
      "2 Grand Royal Heirloom albums (45 pages each) with wooden box",
      "Same-day evening photo teaser display at reception"
    ],
    deliverables: [
      "1200+ Masterfully color-graded high-resolution photos",
      "Cinematic 4K Wedding Film & Instagram Teasers",
      "2 Master Fine-Art Heirloom albums in customized teakwood box",
      "Raw footage & archival hard drive delivered"
    ],
    popular: false
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Ananya & Karthik",
    role: "Wedding Ceremony",
    location: "Madurai",
    avatar: "/assets/t1-Csca0eWI.jpg",
    rating: 5,
    quote: "We forgot the camera was there. Months later when we opened our album, my mother cried at the photograph of my father tying the jasmine flowers in my hair. Aaruthra Studio did not just take pictures — they preserved our deepest memories."
  },
  {
    id: "t-2",
    name: "The Sundaram Family",
    role: "Family Legacy Portrait",
    location: "Thanjavur",
    avatar: "/assets/t2-CcLdH2LB.jpg",
    rating: 5,
    quote: "Four generations gathered in the ancestral house my grandfather built. Aaruthra spent hours getting every child smiling and every elder comfortable. That framed heirloom portrait is now the first thing guests see when they enter our home."
  },
  {
    id: "t-3",
    name: "Lakshmi & Narayanan",
    role: "Muhurtham & Reception",
    location: "Kumbakonam",
    avatar: "/assets/t3-DiLudlle.jpg",
    rating: 5,
    quote: "They understood every intricate South Indian ritual without needing to be directed. Nothing was rushed, nothing was awkwardly posed, and not a single tear or smile from our grandparents was missed. Truly world-class craftsmanship."
  }
];

export const INITIAL_CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: "aaruthra-studio",
  uploadPreset: "wedding_gallery",
  apiKey: "",
  enabled: false
};
