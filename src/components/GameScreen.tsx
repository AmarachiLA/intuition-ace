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
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'wrong' | 'timeout'>('playing');
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

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
  };

  const handleCardClick = (index: number) => {
    if (gameState !== 'playing') return;
    
    setSelectedCard(index);
    if (choiceNumbers[index] === centerNumber) {
      setGameState('correct');
      setScore(prev => prev + 1);
      setTimeout(() => {
        nextRound();
      }, 1500);
    } else {
      setGameState('wrong');
      setTimeout(() => {
        nextRound();
      }, 1500);
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
      setGameState('timeout');
      setTimeout(() => {
        nextRound();
      }, 1500);
    }
  }, [timeLeft, gameState]);

  const getCardClassName = (index: number) => {
    let baseClass = "game-card text-center flex items-center justify-center min-h-[120px]";
    
    if (selectedCard === index) {
      if (gameState === 'correct') return `${baseClass} success-glow`;
      if (gameState === 'wrong') return `${baseClass} error-flash`;
    }
    
    return baseClass;
  };

  const getFeedbackMessage = () => {
    switch (gameState) {
      case 'correct':
        return "Your intuition was right! ✨";
      case 'wrong':
        return "Your intuition failed... try again! 💫";
      case 'timeout':
        return "Time's up! Trust your intuition faster! ⏰";
      default:
        return "How well do you trust your intuition?";
    }
  };

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
            <div className="text-8xl font-bold text-primary">{centerNumber}</div>
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