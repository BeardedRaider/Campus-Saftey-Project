// -------------------------------------------------------------
// Hook: useTrackingHistory
// Purpose: Manage tracking sessions + breadcrumb points.
//
// This hook stores:
// - Tracking sessions (start/end times + list of point IDs)
// - Tracking points (timestamp + lat/lng)
//
// Architecture:
// - TrackingProvider calls startSession() when tracking begins
// - TrackingProvider calls addPoint() on every GPS update
// - TrackingProvider calls endSession() when tracking stops
//
// Storage keys:
// - trackingSessions: TrackingSession[]
// - trackingPoints: TrackingPoint[]
//
// This hook exposes:
// - startSession()
// - addPoint()
// - endSession()
// - deleteSession()   <-- NEW
// - getSessions()
// - getSessionById()
// - getPointsForSession()
// -------------------------------------------------------------

import { useCallback } from "react";
import { v4 as uuid } from "uuid";

// -------------------------------------------------------------
// Types
// -------------------------------------------------------------
export interface TrackingPoint {
  id: string;
  sessionId: string; // string session ID
  timestamp: number;
  latitude: number;
  longitude: number;
}

export interface TrackingSession {
  id: string; // string session ID
  startedAt: number;
  endedAt: number | null;
  pointIds: string[];
}

// -------------------------------------------------------------
// LocalStorage helpers
// -------------------------------------------------------------
const SESSIONS_KEY = "trackingSessions";
const POINTS_KEY = "trackingPoints";

function loadSessions(): TrackingSession[] {
  const raw = localStorage.getItem(SESSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function loadPoints(): TrackingPoint[] {
  const raw = localStorage.getItem(POINTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveSessions(sessions: TrackingSession[]) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

function savePoints(points: TrackingPoint[]) {
  localStorage.setItem(POINTS_KEY, JSON.stringify(points));
}

// -------------------------------------------------------------
// Hook
// -------------------------------------------------------------
export function useTrackingHistory() {
  // -----------------------------------------------------------
  // Start a new tracking session
  // Called when tracking begins
  // -----------------------------------------------------------
  const startSession = useCallback((): string => {
    const sessions = loadSessions();

    const newSession: TrackingSession = {
      id: uuid(), // string ID
      startedAt: Date.now(),
      endedAt: null,
      pointIds: [],
    };

    sessions.push(newSession);
    saveSessions(sessions);

    return newSession.id;
  }, []);

  // -----------------------------------------------------------
  // Add a breadcrumb point to a session
  // Called on every GPS update
  // -----------------------------------------------------------
  const addPoint = useCallback(
    (
      sessionId: string,
      latitude: number,
      longitude: number,
      timestamp: number,
    ) => {
      const sessions = loadSessions();
      const points = loadPoints();

      const session = sessions.find((s) => s.id === sessionId);
      if (!session) return;

      const point: TrackingPoint = {
        id: uuid(),
        sessionId,
        timestamp,
        latitude,
        longitude,
      };

      points.push(point);
      session.pointIds.push(point.id);

      savePoints(points);
      saveSessions(sessions);
    },
    [],
  );

  // -----------------------------------------------------------
  // End a session
  // Called when tracking stops
  // -----------------------------------------------------------
  const endSession = useCallback((sessionId: string) => {
    const sessions = loadSessions();
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    session.endedAt = Date.now();
    saveSessions(sessions);
  }, []);

  // -----------------------------------------------------------
  // Delete a session + all its points
  // -----------------------------------------------------------
  const deleteSession = useCallback((sessionId: string) => {
    const sessions = loadSessions();
    const points = loadPoints();

    // Remove the session
    const updatedSessions = sessions.filter((s) => s.id !== sessionId);

    // Remove all points belonging to this session
    const updatedPoints = points.filter((p) => p.sessionId !== sessionId);

    saveSessions(updatedSessions);
    savePoints(updatedPoints);
  }, []);

  // -----------------------------------------------------------
  // Get all sessions (most recent first)
  // -----------------------------------------------------------
  const getSessions = useCallback((): TrackingSession[] => {
    return loadSessions().sort((a, b) => b.startedAt - a.startedAt);
  }, []);

  // -----------------------------------------------------------
  // Get a single session by ID
  // -----------------------------------------------------------
  const getSessionById = useCallback((id: string): TrackingSession | null => {
    return loadSessions().find((s) => s.id === id) || null;
  }, []);

  // -----------------------------------------------------------
  // Get all points for a session (in chronological order)
  // -----------------------------------------------------------
  const getPointsForSession = useCallback(
    (sessionId: string): TrackingPoint[] => {
      const points = loadPoints().filter((p) => p.sessionId === sessionId);
      return points.sort((a, b) => a.timestamp - b.timestamp);
    },
    [],
  );

  return {
    startSession,
    addPoint,
    endSession,
    deleteSession, // <-- EXPORTED
    getSessions,
    getSessionById,
    getPointsForSession,
  };
}
