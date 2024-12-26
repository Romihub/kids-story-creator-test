// src/hooks/useCollaboration.ts
import { useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { 
  Collaborator, 
  DrawingUpdate, 
  DrawingSession, 
  StrokeData 
} from '../types/collaboration';
import { API_URL } from '@env';

export const useCollaboration = (sessionId: string) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [session, setSession] = useState<DrawingSession | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const initializeSocket = useCallback(() => {
    socketRef.current = io(`${API_URL}/drawing`, {
      query: { sessionId }
    });

    socketRef.current.on('stroke', (update: DrawingUpdate) => {
      if (update.data) {
        setSession(prev => prev ? {
          ...prev,
          strokes: [...prev.strokes, update.data!],
          lastModified: update.timestamp
        } : null);
      }
    });

    socketRef.current.on('collaborator_joined', (collaborator: Collaborator) => {
      setCollaborators(prev => [...prev, collaborator]);
    });

    socketRef.current.on('collaborator_left', (collaboratorId: string) => {
      setCollaborators(prev => 
        prev.filter(c => c.id !== collaboratorId)
      );
    });
  }, [sessionId]);

  const startSession = useCallback((initialStrokes: StrokeData[] = []) => {
    initializeSocket();
    setSession({
      id: sessionId,
      collaborators: [],
      strokes: initialStrokes,
      status: 'active',
      createdAt: Date.now(),
      lastModified: Date.now()
    });
  }, [sessionId, initializeSocket]);

  const endSession = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setSession(null);
    setCollaborators([]);
  }, []);

  const addStroke = useCallback((stroke: StrokeData) => {
    setSession(prev => prev ? {
      ...prev,
      strokes: [...prev.strokes, stroke],
      lastModified: Date.now()
    } : null);
  }, []);

  const undoStroke = useCallback(() => {
    setSession(prev => prev ? {
      ...prev,
      strokes: prev.strokes.slice(0, -1),
      lastModified: Date.now()
    } : null);
  }, []);

  const redoStroke = useCallback(() => {
    // Implement redo logic
  }, []);

  const sendUpdate = useCallback((update: DrawingUpdate) => {
    if (socketRef.current) {
      socketRef.current.emit('stroke', update);
    }
  }, []);

  return {
    collaborators,
    session,
    sendUpdate,
    startSession,
    endSession,
    addStroke,
    undoStroke,
    redoStroke,
  };
}; 