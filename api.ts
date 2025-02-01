// This file centralizes all mobile API requests.

import { KarmaAction, UserProfile } from "./types";

export async function analyzeMedia(mediaUrl: string): Promise<{ analysis?: string, error?: string }> {
  const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/ai/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mediaUrl }),
  });
  return res.json();
}

export async function createKarmaAction(data: KarmaAction): Promise<{ message?: string; error?: string }> {
  const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/karma/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchNearbyKarmaActions(latitude: number, longitude: number, radius?: number): Promise<{ actions?: KarmaAction[]; error?: string }> {
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radius: (radius || 5000).toString(),
  });
  const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/karma/nearby?${queryParams.toString()}`);
  return res.json();
}

export async function getUserProfile(userId: string): Promise<{ profile?: UserProfile; error?: string }> {
  const queryParams = new URLSearchParams({ userId });
  const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/users/profile?${queryParams.toString()}`);
  return res.json();
}

export async function sendNotification(userId: string, message: string): Promise<{ message?: string; error?: string }> {
  const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/notifications/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, message }),
  });
  return res.json();
} 