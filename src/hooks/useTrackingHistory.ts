// -------------------------------------------------------------
// Hook: useTrackingHistory (Per‑User Storage)
// -------------------------------------------------------------

import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useAuth } from "../context/AuthProvider";

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

export function useTrackingHistory() {
  const { user } = useAuth();

  const SESSIONS_KEY = `trackingSessions_${user?.id}`;
  const POINTS_KEY = `trackingPoints_${user?.id}`;

  const loadSessions = (): TrackingSession[] => {
    if (!user) return [];
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const loadPoints = (): TrackingPoint[] => {
    if (!user) return [];
    const raw = localStorage.getItem(POINTS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const saveSessions = (sessions: TrackingSession[]) => {
    if (!user) return;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  };

  const savePoints = (points: TrackingPoint[]) => {
    if (!user) return;
    localStorage.setItem(POINTS_KEY, JSON.stringify(points));
  };

  const sessions = loadSessions();
  const points = loadPoints();

  // Start a new tracking session
  const startSession = useCallback((): string => {
    if (!user) return "";

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
  }, [user, SESSIONS_KEY]);

  // Add a breadcrumb point
  const addPoint = useCallback(
    (
      sessionId: string,
      latitude: number,
      longitude: number,
      timestamp: number,
    ) => {
      if (!user) return;

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
    [user, SESSIONS_KEY, POINTS_KEY],
  );

  // End a session
  const endSession = useCallback(
    (sessionId: string) => {
      if (!user) return;

      const sessions = loadSessions();
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) return;

      session.endedAt = Date.now();
      saveSessions(sessions);
    },
    [user, SESSIONS_KEY],
  );

  // Delete a session + all its points
  const deleteSession = useCallback(
    (sessionId: string) => {
      if (!user) return;

      const sessions = loadSessions();
      const points = loadPoints();

      const updatedSessions = sessions.filter((s) => s.id !== sessionId);
      const updatedPoints = points.filter((p) => p.sessionId !== sessionId);

      saveSessions(updatedSessions);
      savePoints(updatedPoints);
    },
    [user, SESSIONS_KEY, POINTS_KEY],
  );

  const getSessions = useCallback((): TrackingSession[] => {
    if (!user) return [];
    return loadSessions().sort((a, b) => b.startedAt - a.startedAt);
  }, [user, SESSIONS_KEY]);

  const getSessionById = useCallback(
    (id: string): TrackingSession | null => {
      if (!user) return null;
      return loadSessions().find((s) => s.id === id) || null;
    },
    [user, SESSIONS_KEY],
  );

  const getPointsForSession = useCallback(
    (sessionId: string): TrackingPoint[] => {
      if (!user) return [];
      const points = loadPoints().filter((p) => p.sessionId === sessionId);
      return points.sort((a, b) => a.timestamp - b.timestamp);
    },
    [user, POINTS_KEY],
  );

  const getPointCounts = useCallback((): Record<string, number> => {
    if (!user) return {};

    const sessions = loadSessions();
    const points = loadPoints();

    const counts: Record<string, number> = {};

    sessions.forEach((session) => {
      counts[session.id] = points.filter(
        (p) => p.sessionId === session.id,
      ).length;
    });

    return counts;
  }, [user, SESSIONS_KEY, POINTS_KEY]);

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
    getPointCounts,
  };
}
