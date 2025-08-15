import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import logoImage from '@/assets/intuition-logo.png';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const [showStory, setShowStory] = useState(false);

  const handleStart = () => {
    setShowStory(true);
    setTimeout(() => {
      onStart();
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-8">
      {/* Animated Eye Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="eye-container">
          <div className="eye-outer">
            <div className="eye-inner">
              <div className="pupil"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src={logoImage} 
          alt="Intuition Logo" 
          className="w-48 h-48 sm:w-96 sm:h-96 logo-rotate"
        />
      </div>

      {/* Content */}
      <div className="z-10 text-center max-w-4xl px-4 sm:px-8">
        {!showStory ? (
          <>
            <img 
              src={logoImage} 
              alt="Intuition Logo" 
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 neon-glow"
            />
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              How Well Do You Trust Your Intuition?
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
              In a world where trust is rare, and choices shape your future...
            </p>
            <Button 
              onClick={handleStart}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 w-full sm:w-auto"
            >
              <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Begin the Test
            </Button>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="text-lg sm:text-2xl mb-6 sm:mb-8 text-accent font-semibold leading-relaxed">
              "In a world where trust is rare, and choices shape your future… how well do you trust your intuition?"
            </div>
            <div className="text-base sm:text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
              Many times in life, the right choice isn't the most obvious. In this game, your only guide is your intuition — can you trust it before time runs out?
            </div>
          </div>
        )}
      </div>

      {/* Branding */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-xs sm:text-sm text-muted-foreground">
        Inspired by{' '}
        <a href="https://x.com/0xIntuition" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          @0xIntuition
        </a>
      </div>
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-xs sm:text-sm text-muted-foreground">
        Built by{' '}
        <a href="https://x.com/Ludarep" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          @Ludarep
        </a>
      </div>
    </div>
  );
};