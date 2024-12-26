// src/components/premium/CollaborativeDrawing.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSubscription } from '../../hooks/useSubscription';
import { useCollaboration } from '../../hooks/useCollaboration';
import { DrawingCanvas } from '../drawing/DrawingCanvas';
import { CollaboratorsList } from './CollaboratorsList';
import { RealTimeIndicator } from './RealTimeIndicator';
import { PlaybackControls } from './PlaybackControls';
import type { 
  Collaborator, 
  DrawingUpdate, 
  DrawingSession, 
  StrokeData 
} from '../../types/collaboration';

interface CollaborativeDrawingProps {
  sessionId: string;
  onUpdate?: (update: DrawingUpdate) => void;
  initialStrokes?: StrokeData[];
}

export const CollaborativeDrawing: React.FC<CollaborativeDrawingProps> = ({
  sessionId,
  onUpdate,
  initialStrokes = [],
}) => {
  const { tier } = useSubscription();
  const { 
    collaborators,
    sendUpdate,
    startSession,
    endSession,
    session,
    addStroke,
    undoStroke,
    redoStroke,
  } = useCollaboration(sessionId);

  const [isActive, setIsActive] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(0);

  useEffect(() => {
    if (tier.id !== 'free') {
      startSession(initialStrokes);
      setIsActive(true);
      return () => {
        endSession();
      };
    }
  }, [tier.id, startSession, endSession, initialStrokes]);

  const handleStroke = (stroke: StrokeData) => {
    if (isActive) {
      addStroke(stroke);
      sendUpdate({
        type: 'stroke',
        data: stroke,
        timestamp: Date.now(),
        userId: session?.collaborators[0]?.id || '',
      });
    }
  };

  const handlePlayback = () => {
    if (!session) return;
    const nextStroke = session.strokes[playbackIndex];
    if (nextStroke) {
      handleStroke(nextStroke);
      setPlaybackIndex(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <DrawingCanvas 
        tool="pencil"
        color="#000"
        strokeWidth={2}
        onStroke={handleStroke}
        strokes={session?.strokes || []}
        onUndo={undoStroke}
        onRedo={redoStroke}
      />
      {isActive && (
        <>
          <CollaboratorsList collaborators={collaborators} />
          <RealTimeIndicator isConnected={isActive} />
          <PlaybackControls 
            onPlay={handlePlayback}
            hasMoreStrokes={playbackIndex < (session?.strokes.length || 0)}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});