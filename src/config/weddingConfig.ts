export interface CeremonyScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface WeddingEventItem {
  name: string;
  date: string;
  time?: string;
  venue?: string;
  attire?: string;
}

export interface CouplePhotoItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface WeddingConfig {
  bride: string;
  groom: string;
  coupleDisplay: string;
  monogram: string;
  websiteTitle: string;
  weddingDateFormatted: string;
  weddingDayOfWeek: string;
  weddingMonthLabel: string;
  weddingDayNumber: string;
  weddingYear: string;
  weddingShortDate: string;
  /** ISO 8601 date-time string in India Standard Time (+05:30) */
  weddingTargetIsoIST: string;
  invitationTagline: string;
  detailsLead: string;
  footerQuote: string;
  /**
   * Optional details below remain hidden until real, confirmed information is added.
   */
  venue: {
    name: string;
    address: string;
    city: string;
    mapUrl?: string;
  } | null;
  ceremonySchedule: CeremonyScheduleItem[];
  dressCode: string | null;
  accommodation: string | null;
  transportation: string | null;
  weddingEvents: WeddingEventItem[];
  couplePhotos: CouplePhotoItem[];
  /**
   * Optional external audio URL. If omitted, a soft synthesized Web Audio piano & strings piece plays after user interaction.
   */
  audioUrl: string | null;
  /**
   * Ready for future Google Forms, Formspree, or custom RSVP webhook integration.
   */
  rsvpService: {
    configured: boolean;
    providerName: string;
    endpointUrl: string;
  };
  /**
   * Ready for future Google Forms or private blessing webhook integration.
   */
  blessingService: {
    configured: boolean;
    providerName: string;
    endpointUrl: string;
  };
}

export const weddingConfig: WeddingConfig = {
  bride: 'Pooja Gupta',
  groom: 'Saurav',
  coupleDisplay: 'Pooja & Saurav',
  monogram: 'P & S',
  websiteTitle: 'Pooja & Saurav | A Wedding Invitation',
  weddingDateFormatted: 'Friday, 20 November 2026',
  weddingDayOfWeek: 'FRIDAY',
  weddingMonthLabel: 'NOVEMBER',
  weddingDayNumber: '20',
  weddingYear: '2026',
  weddingShortDate: '20.11.2026',
  weddingTargetIsoIST: '2026-11-20T00:00:00+05:30',
  invitationTagline: 'A celebration of love, togetherness and new beginnings.',
  detailsLead: 'Join us as two hearts begin a beautiful new chapter together.',
  footerQuote: 'Two Hearts. One Journey. A Lifetime of Love.',

  // Confirmed details only — keep optional sections hidden until real info is supplied
  venue: null,
  ceremonySchedule: [],
  dressCode: null,
  accommodation: null,
  transportation: null,
  weddingEvents: [],
  couplePhotos: [],

  audioUrl: null,
  rsvpService: {
    configured: false,
    providerName: '',
    endpointUrl: '',
  },
  blessingService: {
    configured: false,
    providerName: '',
    endpointUrl: '',
  },
};
