import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import logoImage from '@/assets/intuition-logo.png';

interface GameScreenProps {
  onRestart: () => void;
}

export const GameScreen = ({ onRestart }: GameScreenProps) => {
  const [centerNumber, setCenterNumber] = useState<number>(1);
  const [choiceNumbers, setChoiceNumbers] = useState<number[]>([2, 3, 4]);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'gameOver'>('playing');
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showCenterNumber, setShowCenterNumber] = useState<boolean>(false);

  const generateRound = () => {
    const center = Math.floor(Math.random() * 100) + 1;
    const correctPosition = Math.floor(Math.random() * 3);
    const choices = Array(3).fill(0).map((_, index) => {
      if (index === correctPosition) return center;
      let num;
      do {
        num = Math.floor(Math.random() * 100) + 1;
      } while (num === center);
      return num;
    });
    
    setCenterNumber(center);
    setChoiceNumbers(choices);
    setTimeLeft(10);
    setGameState('playing');
    setSelectedCard(null);
    setShowCenterNumber(false);
  };

  const handleCardClick = (index: number) => {
    if (gameState !== 'playing') return;
    
    setSelectedCard(index);
    if (choiceNumbers[index] === centerNumber) {
      setGameState('correct');
      setShowCenterNumber(true);
      setScore(prev => prev + 1);
      setTimeout(() => {
        nextRound();
      }, 2000);
    } else {
      setGameState('gameOver');
    }
  };

  const nextRound = () => {
    setRound(prev => prev + 1);
    generateRound();
  };

  useEffect(() => {
    generateRound();
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('gameOver');
    }
  }, [timeLeft, gameState]);

  const getCardClassName = (index: number) => {
    let baseClass = "game-card text-center flex items-center justify-center min-h-[120px]";
    
    if (selectedCard === index && gameState === 'correct') {
      return `${baseClass} success-glow`;
    }
    
    return baseClass;
  };

  const getFeedbackMessage = () => {
    switch (gameState) {
      case 'correct':
        return "Your intuition was right! ✨ Next round...";
      case 'gameOver':
        return `Game Over! You trusted your intuition for ${score} round${score !== 1 ? 's' : ''} 💫`;
      default:
        return "How well do you trust your intuition?";
    }
  };

  // Game Over Screen
  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img 
            src={logoImage} 
            alt="Intuition Logo" 
            className="w-96 h-96 logo-rotate"
          />
        </div>
        
        <div className="z-10 text-center max-w-2xl px-8">
          <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-destructive to-accent bg-clip-text text-transparent">
            Game Over
          </div>
          <div className="text-2xl text-foreground mb-4">
            Your intuition guided you through <span className="text-accent font-bold">{score}</span> round{score !== 1 ? 's' : ''}
          </div>
          <div className="text-lg text-muted-foreground mb-8">
            {score === 0 && "Trust takes practice. Try again!"}
            {score >= 1 && score <= 3 && "Not bad! Your intuition is developing."}
            {score >= 4 && score <= 7 && "Impressive! You have strong intuitive abilities."}
            {score >= 8 && "Incredible! Your intuition is truly remarkable."}
          </div>
          <Button 
            onClick={onRestart}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 text-lg px-12 py-6"
          >
            Trust Again
          </Button>
        </div>

        {/* Branding */}
        <div className="absolute bottom-6 left-6 text-sm text-muted-foreground">
          Inspired by{' '}
          <a href="https://x.com/0xIntuition" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            https://x.com/0xIntuition
          </a>
        </div>
        <div className="absolute bottom-6 right-6 text-sm text-muted-foreground">
          Built by{' '}
          <a href="https://x.com/Ludarep" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            https://x.com/Ludarep
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-8">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src={logoImage} 
          alt="Intuition Logo" 
          className="w-[600px] h-[600px] logo-rotate"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-8">
        <div>
          <div className="text-2xl font-bold text-accent">Round {round}</div>
          <div className="text-lg text-muted-foreground">Score: {score}</div>
        </div>
        <Button onClick={onRestart} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart
        </Button>
      </div>

      {/* Timer Bar */}
      <div className="relative z-10 w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
        <div 
          className="timer-bar h-full transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / 10) * 100}%` }}
        />
      </div>

      {/* Game Area */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Center Card */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <Card className="game-card-center w-full max-w-md aspect-square flex items-center justify-center">
            {showCenterNumber ? (
              <div className="text-8xl font-bold text-primary">{centerNumber}</div>
            ) : (
              <div className="text-2xl font-bold text-accent text-center leading-relaxed">
                Trust Your<br />Intuition
              </div>
            )}
          </Card>
        </div>

        {/* Choice Cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {choiceNumbers.map((number, index) => (
            <Card 
              key={index} 
              className={getCardClassName(index)}
              onClick={() => handleCardClick(index)}
            >
              <div className="text-4xl font-bold text-foreground">{number}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="relative z-10 text-center mt-12">
        <div className="text-2xl font-semibold text-accent">
          {getFeedbackMessage()}
        </div>
      </div>

      {/* Branding */}
      <div className="absolute bottom-6 left-6 text-sm text-muted-foreground z-10">
        Inspired by{' '}
        <a href="https://x.com/0xIntuition" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          https://x.com/0xIntuition
        </a>
      </div>
      <div className="absolute bottom-6 right-6 text-sm text-muted-foreground z-10">
        Built by{' '}
        <a href="https://x.com/Ludarep" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          https://x.com/Ludarep
        </a>
      </div>
    </div>
  );
};