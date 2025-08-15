import { useState } from 'react';
import { IntroScreen } from '@/components/IntroScreen';
import { GameScreen } from '@/components/GameScreen';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
  };

  return (
    <>
      {!gameStarted ? (
        <IntroScreen onStart={handleStart} />
      ) : (
        <GameScreen onRestart={handleRestart} />
      )}
    </>
  );
};

export default Index;
