import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import logoImage from '@/assets/intuition-logo.png';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const [showStory, setShowStory] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { speak } = useTextToSpeech();

  const handleStart = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setShowStory(true);
    
    try {
      await speak("In a world where trust is rare, and choices shape your future… how well do you trust your intuition?");
    } catch (error) {
      console.error('Voice playback failed:', error);
    }
    
    setTimeout(() => {
      onStart();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img 
          src={logoImage} 
          alt="Intuition Logo" 
          className="w-96 h-96 logo-rotate"
        />
      </div>

      {/* Content */}
      <div className="z-10 text-center max-w-4xl px-8">
        {!showStory ? (
          <>
            <img 
              src={logoImage} 
              alt="Intuition Logo" 
              className="w-32 h-32 mx-auto mb-8 neon-glow"
            />
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How Well Do You Trust Your Intuition?
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              In a world where trust is rare, and choices shape your future...
            </p>
            <Button 
              onClick={handleStart}
              size="lg"
              disabled={isPlaying}
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 text-lg px-12 py-6"
            >
              <Play className="mr-2 h-6 w-6" />
              {isPlaying ? 'Speaking...' : 'Begin the Test'}
            </Button>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="text-2xl mb-8 text-accent font-semibold">
              "In a world where trust is rare, and choices shape your future… how well do you trust your intuition?"
            </div>
            <div className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
              Many times in life, the right choice isn't the most obvious. In this game, your only guide is your intuition — can you trust it before time runs out?
            </div>
          </div>
        )}
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
};