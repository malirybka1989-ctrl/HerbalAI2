// ============================================================
// HerbaAI — Shared Type Definitions
// ============================================================

// --- User & Auth ---
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
  stripe_customer_id?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// --- Subscription ---
export type SubscriptionPlan = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_end: string;
}

// --- Ingredients & Pantry ---
export type IngredientCategory = 'Spice' | 'Herb' | 'Fruit' | 'Vegetable' | 'Household' | 'Other';

export interface TcmProperties {
  nature: string;
  taste: string;
  meridians: string[];
}

export interface AyurvedicProperties {
  dosha: string;
  guna: string;
}

export interface Ingredient {
  id: string;
  name: string;
  scientific_name?: string;
  category: IngredientCategory;
  tcm_properties?: TcmProperties;
  ayurvedic_properties?: AyurvedicProperties;
  folk_wisdom?: string;
  astrological_assoc?: string;
  safety_notes?: string;
  contraindications?: string[];
}

export interface PantryItem {
  id: string;
  user_id: string;
  ingredient_id: string;
  ingredient?: Ingredient;
  quantity?: string;
  added_at: string;
}

// --- Wellness Suggestions ---
export type WellnessTradition = 'TCM' | 'Ayurveda' | 'Folk Wisdom' | 'Astrology' | 'Acupressure';

export interface WellnessSuggestion {
  id: string;
  ingredient_id: string;
  tradition: WellnessTradition;
  title: string;
  description: string;
  instructions: string;
  safety_disclaimer?: string;
}

export interface PantryScanResult {
  id: string;
  ingredients_used: string[];
  ai_response: {
    essence: string;
    ritual: string;
    tradition_wisdom: string;
    safety_note: string;
  };
  created_at: string;
}

// --- Practitioners & Consultations ---
export interface Practitioner {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  calendar_link?: string;
  price_per_session: number;
  rating?: number;
  review_count?: number;
}

export type ConsultationStatus = 'scheduled' | 'completed' | 'canceled' | 'pending';

export interface Consultation {
  id: string;
  user_id: string;
  practitioner_id: string;
  practitioner?: Practitioner;
  status: ConsultationStatus;
  scheduled_at: string;
  meeting_link?: string;
}

// --- Courses ---
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  video_url?: string;
  duration: number;
  thumbnail_url?: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  course?: Course;
  progress: number;
  completed_at?: string;
}

// --- Navigation ---
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  MainTabs: undefined;
  PantryScan: undefined;
  ScanResults: { scanId: string };
  SuggestionDetail: { suggestionId: string };
  PractitionerDetail: { practitionerId: string };
  ConsultationBooking: { practitionerId: string };
  CourseDetail: { courseId: string };
  CoursePlayer: { courseId: string; enrollmentId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Pantry: undefined;
  Explore: undefined;
  Profile: undefined;
};