// This file centralizes all mobile API requests.

import { KarmaAction, UserProfile } from "./types";

export async function analyzeMedia(mediaUrl: string): Promise<{ analysis?: string, error?: string }> {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/ai/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mediaUrl }),
  });
  return res.json();
}

export async function createKarmaAction(data: KarmaAction): Promise<{ message?: string; error?: string }> {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/karma/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchNearbyKarmaActions(lat: number, lon: number) {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/karma/nearby?lat=${lat}&lon=${lon}`);
  if (!response.ok) {
    throw new Error('Error fetching nearby actions');
  }
  return response.json();
}

export async function getUserProfile(userId: string): Promise<{ profile?: UserProfile; error?: string }> {
  const queryParams = new URLSearchParams({ userId });
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/users/profile?${queryParams.toString()}`);
  return res.json();
}

export async function getUserImpact(userId: string): Promise<{ totalKarma?: number; weeklyImpact?: number[]; error?: string }> {
  const queryParams = new URLSearchParams({ userId });
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/users/impact?${queryParams.toString()}`);
  return res.json();
}

export async function sendNotification(userId: string, message: string): Promise<{ message?: string; error?: string }> {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/notifications/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, message }),
  });
  return res.json();
}

export async function fetchChallenges(active: boolean = false): Promise<{ challenges?: any[]; error?: string }> {
  const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/challenges/list${active ? '?active=true' : ''}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchBadges(): Promise<{ badges?: any[]; error?: string }> {
  const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/badges/list`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchUserBadges(userId: string): Promise<{ badges?: any[]; error?: string }> {
  const queryParams = new URLSearchParams({ userId });
  const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/user/badges?${queryParams.toString()}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchLeaderboard(): Promise<{ leaderboard?: any[]; error?: string }> {
  const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/leaderboard/index`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchUserAnalytics(userId: string): Promise<{ actions?: any[]; error?: string }> {
  const queryParams = new URLSearchParams({ userId });
  const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/users/analytics?${queryParams.toString()}`;
  const res = await fetch(url);
  return res.json();
}