export type DeviceCategory = 'notebook' | 'desktop' | 'smartphone' | 'tablet' | 'field_support';

export type ServiceModality = 'laboratory' | 'field_support';

export interface ServiceItem {
  id: string;
  category: DeviceCategory;
  title: string;
  badge: string;
  iconName: string;
  summary: string;
  description: string;
  commonProblems: string[];
  keySolutions: string[];
  estimatedTime: string;
  warranty: string;
  highlight?: boolean;
}

export interface AppointmentFormData {
  customerName: string;
  phone: string;
  email: string;
  category: DeviceCategory;
  deviceModel: string;
  modality: ServiceModality;
  problemSummary: string;
  preferredDate: string;
  preferredPeriod: 'morning' | 'afternoon' | 'commercial';
  addressStreet?: string;
  addressNeighborhood?: string;
  notes?: string;
}

export interface BookingConfirmation {
  protocol: string;
  formData: AppointmentFormData;
  submittedAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  roleOrCompany: string;
  rating: number;
  date: string;
  serviceRendered: string;
  comment: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'garantia' | 'prazos' | 'campo' | 'geral';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isSimulated?: boolean;
}

export interface CompanyLocation {
  name: string;
  tagline: string;
  cnpj: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  fullAddress: string;
  phone: string;
  whatsapp: string;
  whatsappFormatted: string;
  email: string;
  workingHoursWeekday: string;
  workingHoursSaturday: string;
  workingHoursSunday: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  latitude: number;
  longitude: number;
}
