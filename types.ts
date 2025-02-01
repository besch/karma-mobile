// Common types for the mobile app

export interface KarmaAction {
  id: string;
  user_id: string;
  action_type: string;
  description: string;
  points: number;
  media_url: string;
  media_type: string;
  ai_analysis: Record<string, any>;
  geolocation: any; // Adjust this type if you have a stricter definition
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  notification_enabled: boolean;
  is_anonymous: boolean;
}

export interface AnalyzeMediaResponse {
  analysis?: string;
  error?: string;
}

export interface CreateKarmaActionResponse {
  message?: string;
  error?: string;
}

export interface FetchNearbyKarmaActionsResponse {
  actions?: KarmaAction[];
  error?: string;
}

export interface GetUserProfileResponse {
  profile?: UserProfile;
  error?: string;
}

export interface SendNotificationResponse {
  message?: string;
  error?: string;
} 