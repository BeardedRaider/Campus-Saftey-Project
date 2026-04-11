// -------------------------------------------------------------
// Hook: useTrackingHistory (Per‑User Storage)
//
// Purpose: Manage tracking sessions + breadcrumb points.
//
// Stores:
// - Tracking sessions (start/end times + list of point IDs)
// - Tracking points (timestamp + lat/lng)
//
// Notes:
// - Now fully isolated per user using user.id
//   Example keys:
//   trackingSessions_<userId>
//   trackingPoints_<userId>
// -------------------------------------------------------------

import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useAuth } from "../context/AuthProvider";

// -------------------------------------------------------------
// Types
// -------------------------------------------------------------
export interface TrackingPoint {
  id: string;
  sessionId: string;
  timestamp: number;
  latitude: number;
  longitude: number;
}

export interface TrackingSession {
  id: string;
  startedAt: number;
  endedAt: number | null;
  pointIds: string[];
}

// -------------------------------------------------------------
// Hook
// -------------------------------------------------------------
export function useTrackingHistory() {
  const { user } = useAuth();

  // -------------------------------------------------------------
  // Per‑user LocalStorage keys
  // -------------------------------------------------------------
  const SESSIONS_KEY = `trackingSessions_${user?.id}`;
  const POINTS_KEY = `trackingPoints_${user?.id}`;

  // -------------------------------------------------------------
  // LocalStorage helpers (per user)
  // -------------------------------------------------------------
  const loadSessions = (): TrackingSession[] => {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const loadPoints = (): TrackingPoint[] => {
    const raw = localStorage.getItem(POINTS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const saveSessions = (sessions: TrackingSession[]) => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  };

  const savePoints = (points: TrackingPoint[]) => {
    localStorage.setItem(POINTS_KEY, JSON.stringify(points));
  };

  // Load everything into memory so the provider can access it
  const sessions = loadSessions();
  const points = loadPoints();

  // -----------------------------------------------------------
  // Start a new tracking session
  // -----------------------------------------------------------
  const startSession = useCallback((): string => {
    const sessions = loadSessions();

    const newSession: TrackingSession = {
      id: uuid(),
      startedAt: Date.now(),
      endedAt: null,
      pointIds: [],
    };

    sessions.push(newSession);
    saveSessions(sessions);

    return newSession.id;
  }, []);

  // -----------------------------------------------------------
  // Add a breadcrumb point
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

    const updatedSessions = sessions.filter((s) => s.id !== sessionId);
    const updatedPoints = points.filter((p) => p.sessionId !== sessionId);

    saveSessions(updatedSessions);
    savePoints(updatedPoints);
  }, []);

  // -----------------------------------------------------------
  // Get all sessions (sorted)
  // -----------------------------------------------------------
  const getSessions = useCallback((): TrackingSession[] => {
    return loadSessions().sort((a, b) => b.startedAt - a.startedAt);
  }, []);

  // -----------------------------------------------------------
  // Get a single session
  // -----------------------------------------------------------
  const getSessionById = useCallback((id: string): TrackingSession | null => {
    return loadSessions().find((s) => s.id === id) || null;
  }, []);

  // -----------------------------------------------------------
  // Get all points for a session
  // -----------------------------------------------------------
  const getPointsForSession = useCallback(
    (sessionId: string): TrackingPoint[] => {
      const points = loadPoints().filter((p) => p.sessionId === sessionId);
      return points.sort((a, b) => a.timestamp - b.timestamp);
    },
    [],
  );

  return {
    sessions,
    points,
    startSession,
    addPoint,
    endSession,
    deleteSession,
    getSessions,
    getSessionById,
    getPointsForSession,
  };
}
