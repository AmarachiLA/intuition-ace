import { useCallback } from 'react';

export const useGameSounds = () => {
  const playSound = useCallback((frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, []);

  const playCardClick = useCallback(() => {
    playSound(800, 0.1, 'sine');
  }, [playSound]);

  const playCorrect = useCallback(() => {
    // Success chord
    playSound(523, 0.3); // C
    setTimeout(() => playSound(659, 0.3), 100); // E
    setTimeout(() => playSound(784, 0.5), 200); // G
  }, [playSound]);

  const playWrong = useCallback(() => {
    // Error sound
    playSound(200, 0.5, 'triangle');
  }, [playSound]);

  const playTick = useCallback(() => {
    playSound(1000, 0.05, 'square');
  }, [playSound]);

  const playGameOver = useCallback(() => {
    // Descending notes
    playSound(400, 0.3);
    setTimeout(() => playSound(350, 0.3), 150);
    setTimeout(() => playSound(300, 0.5), 300);
  }, [playSound]);

  return {
    playCardClick,
    playCorrect,
    playWrong,
    playTick,
    playGameOver
  };
};