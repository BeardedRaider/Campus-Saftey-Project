// This file defines the CheckIn interface, which represents a user's check-in data including location and timestamp.
export interface CheckIn {
  id: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  accuracy: number;
}
