export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "AI Match", href: "#ai-match" },
  { label: "For Artists", href: "#for-artists" },
] as const;

export const storeLinks = [
  {
    src: "/app-store.png",
    alt: "Download on the App Store",
    href: "#app-store",
  },
  {
    src: "/google-play.png",
    alt: "Get it on Google Play",
    href: "#google-play",
  },
] as const;

export const stats = [
  { value: "5,000+", label: "Verified Live Bands", accent: "#a240ff" },
  { value: "50+", label: "Musical Genres & Styles", accent: "#407fff" },
  { value: "12,500+", label: "Successful Gigs Booked", accent: "#ff4099" },
  { value: "4.9 ★", label: "Average Host & Fan Rating", accent: "#ff6f40" },
] as const;

/* Figma node 40:513 — each entry swaps the phone screenshot on the right. */
export const appTourItems = [
  {
    icon: "equalizer",
    title: "Find your Sound & AI Match",
    body: 'Browse local talent "Featured tonight", check out acts trending in your county, or trigger instant AI band matching.',
    image: "/app-matches.png",
    imageAlt: "AI match results listing the top band matches for an event",
  },
  {
    icon: "badge",
    title: "Band Profiles & Transparent Packages",
    body: 'View full bios, genre tags (Cumbia, Sierreño, Mariachi, Rock), package rates like "Mega Buster $603/hr", and check availability.',
    image: "/app-profile.png",
    imageAlt: "Band profile screen with bio, genres and hourly package price",
  },
  {
    icon: "notes",
    title: "Tailored Genres & Add-on Services",
    body: "Select your event type, music vibes, and book complete services like Videography, Photography, Bartenders, and Sound Rentals.",
    image: "/app-booking.png",
    imageAlt: "Booking request screen with event services and add-ons",
  },
  {
    icon: "pin",
    title: "Geo-Radius & Local Venue Setup",
    body: "Specify your exact town, venue radius, and coordinates so organizers match with musicians nearby.",
    image: "/app-ai-match.png",
    imageAlt: "AI match form with venue location and map radius",
  },
] as const;

export const aiMatchSteps = [
  {
    icon: "calendar",
    label: "1. Choose event occasion",
    options: [
      "Wedding reception",
      "Birthday & fiesta",
      "Outdoor festival",
      "Corporate gala",
    ],
    accent: "#00c9c6",
  },
  {
    icon: "notes",
    label: "2. Pick musical vibe",
    options: [
      "Mariachi & Cumbia",
      "High-energy Rock",
      "Smooth Jazz & Soul",
      "Top 40 Latin Pop",
    ],
    accent: "#ff42dc",
  },
] as const;

export const matchedBands = [
  {
    name: "ORCA Band",
    price: "$653.00",
    genres: ["Mariachi", "Cumbia", "Sierreño"],
    blurb:
      "Authentic 7-piece ensemble bringing festive serenades, brass brilliance, and high-spirited traditional Mexican live energy.",
    location: "Austin",
    image: "/band-stage.png",
    imagePosition: "center 35%",
  },
  {
    name: "Andalusia Rhythms",
    price: "$750.00",
    genres: ["Flamenco", "Bulería", "Cante Jondo"],
    blurb:
      "Passionate performers delivering fiery guitar, heartfelt singing, and vibrant dance that captures the essence of Spanish culture.",
    location: "Seville",
    image: "/hero-bg.png",
    imagePosition: "center 25%",
  },
  {
    name: "Rio de Janeiro Beat",
    price: "$690.00",
    genres: ["Samba", "Bossa Nova", "Sambalanço"],
    blurb:
      "Energetic musicians combining rhythms and percussion for an unforgettable Brazilian fiesta atmosphere.",
    location: "Rio de Janeiro",
    image: "/band-stage.png",
    imagePosition: "right 45%",
  },
] as const;

export const tailoredCards = [
  {
    title: "Upfront pricing, no surprises",
    body: "See verified rates, specs, and travel fees before you book. Every quote is transparent — no back-and-forth guessing.",
    image: "/card-pricing.png",
    imageAlt: "Band profile screens showing transparent hourly pricing",
  },
  {
    title: "Real reviews & live sets",
    body: "Watch actual performances and read authentic reviews from wedding hosts, festival organizers, and event directors.",
    image: "/card-reviews.png",
    imageAlt: "Reviews screen with ratings and live performance clips",
  },
  {
    title: "Your full production, one contract",
    body: "Bundle videographers, photographers, sound, and staff with your live band — all under one secure escrow contract.",
    image: "/card-production.png",
    imageAlt: "Event request and payment breakdown screens",
  },
] as const;

export const appFeatures = [
  {
    icon: "play",
    title: ["SWIPE, WATCH", "& BOOK"],
    body: "Scroll through short clips of live performances, hear bands in action, and book your favorite act for any event — all without leaving the feed.",
    image: "/app-feed.png",
    imageAlt: "In-app video feed with a Book Band button",
    imageWidth: 918,
    imageHeight: 1024,
    reversed: false,
  },
  {
    icon: "chat",
    title: ["CHAT &", "PREPARE YOUR", "EVENT"],
    body: "Message bands directly, discuss your event details, compare packages side by side, and lock in your lineup — all before the big day.",
    image: "/app-messages.png",
    imageAlt: "Messages screen with conversations between hosts and bands",
    imageWidth: 502,
    imageHeight: 1024,
    reversed: true,
  },
  {
    icon: "broadcast",
    title: ["REQUEST &", "BOOK THE BEST"],
    body: "Tell us your event type, date, and vibe. We'll match you with top-rated bands, send you tailored offers, and handle the booking in minutes.",
    image: "/app-requests.png",
    imageAlt: "Open marketplace requests screen with an active event request",
    imageWidth: 502,
    imageHeight: 1024,
    reversed: false,
  },
] as const;

export const testimonials = [
  {
    quote:
      '"We needed a high-energy Cumbia and Mariachi group for our daughter\'s Quinceañera in Austin. Book a Band matched us with Mariachi Sol y Luna in under five minutes. The package pricing was crystal clear, zero haggling, and they tore the house down. Our guests are still talking about the trumpet solos!"',
    name: "Maria Rodriguez",
    role: "Private Event Host • Austin, TX",
    rating: 5,
  },
  {
    quote:
      '"I was looking for a jazz ensemble for my wedding reception in New Orleans. Book a Band connected us with the Jazz All-Stars in no time. Their professionalism was unmatched, and the music created the perfect atmosphere for our big day!"',
    name: "John Smith",
    role: "Wedding Planner • New Orleans, LA",
    rating: 5,
  },
  {
    quote:
      '"I was looking for a jazz ensemble for my wedding reception in New Orleans. Book a Band connected us with the Jazz All-Stars in no time. Their professionalism was unmatched, and the music created the perfect atmosphere for our big day!"',
    name: "Emily Johnson",
    role: "Corporate Event Organizer • San Francisco, CA",
    rating: 5,
  },
] as const;

export const faqs = [
  {
    question: "How does band booking and payment protection work?",
    answer:
      "When you find an act or match through AI, you inspect transparent hourly packages (e.g. $653/hr) and live calendar availability. Once booked, your payment is held in secure escrow and released to the performers only after the show concludes successfully.",
  },
  {
    question: "Is Book a Band natively bilingual in English and Spanish?",
    answer:
      "Yes. The entire app — profiles, packages, chat and booking receipts — switches between English and Spanish, so hosts and musicians always read the same details in their own language.",
  },
  {
    question: "How do touring musicians and bands sign up to get gigs?",
    answer:
      "Create a performer profile, add your genres, media and hourly packages, then set the towns and radius you travel to. Verified requests from local hosts land straight in your inbox.",
  },
  {
    question: "Can I bundle sound equipment, stage lighting, or photographers?",
    answer:
      "You can. Add-on services such as videography, photography, bartenders, rentals and sound gear are booked alongside your band under a single contract and one payment.",
  },
  {
    question: "What happens if an event schedule or venue location changes?",
    answer:
      "Send the new date, time or address from the booking chat. Once both sides confirm the change the contract, escrow payment and calendar update automatically — no re-booking needed.",
  },
] as const;

export const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "AI Match", href: "/#ai-match" },
  { label: "For Artists", href: "/#for-artists" },
  { label: "Contact", href: "/#contact" },
] as const;

export const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;
