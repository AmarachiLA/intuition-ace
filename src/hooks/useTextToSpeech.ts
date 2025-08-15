import { useCallback } from 'react';

export const useTextToSpeech = () => {
  const speak = useCallback(async (text: string, voiceId: string = 'JBFqnCBsd6RMkjVDRZzb') => {
    try {
      // For now, use a simple browser-based TTS as fallback
      // This will be replaced with ElevenLabs once the edge function is working
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7; // Slower speech
      utterance.pitch = 0.8; // Lower pitch for "thick" sound
      utterance.volume = 0.8;
      
      // Try to find a deeper voice
      const voices = speechSynthesis.getVoices();
      const deepVoice = voices.find(voice => 
        voice.name.includes('Daniel') || 
        voice.name.includes('Alex') || 
        voice.name.includes('Fred') ||
        voice.lang.includes('en')
      );
      
      if (deepVoice) {
        utterance.voice = deepVoice;
      }
      
      return new Promise<void>((resolve) => {
        utterance.onend = () => resolve();
        speechSynthesis.speak(utterance);
      });
    } catch (error) {
      console.error('Text-to-speech error:', error);
      throw error;
    }
  }, []);

  return { speak };
};