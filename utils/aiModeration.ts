
// A lightweight, offline "AI" moderation system
// In a production environment, this would call the Gemini API via Cloud Functions

interface ModerationResult {
  flagged: boolean;
  reason?: string;
}

const BAD_WORDS_RU = [
  'сука', 'блять', 'бля', 'хуй', 'пмзда', 'пизда', 'ебать', 'мудак', 'гандон', 'шлюха', 
  'урод', 'дебил', 'лох', 'чмо', 'суицид', 'убить', 'смерть', 'наркотики'
];

const BAD_WORDS_EN = [
  'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'whore', 'slut', 'kill', 'suicide', 'die', 'idiot'
];

export const moderateContent = (text: string): ModerationResult => {
  if (!text) return { flagged: false };
  
  const lowerText = text.toLowerCase();

  // 1. Check for profanity (Direct Match & Leetspeak simulation)
  // Simple check for now, can be expanded with regex
  const allBadWords = [...BAD_WORDS_RU, ...BAD_WORDS_EN];
  
  for (const word of allBadWords) {
    // Basic boundary check or direct inclusion
    if (lowerText.includes(word)) {
      return { 
        flagged: true, 
        reason: 'Profanity / Toxic Language (AI Detected)' 
      };
    }
  }

  // 2. Aggression Detection (Caps Lock Ratio)
  const letters = text.replace(/[^a-zA-Zа-яА-Я]/g, '');
  if (letters.length > 10) {
    const upperCaseCount = letters.split('').filter(l => l === l.toUpperCase()).length;
    if (upperCaseCount / letters.length > 0.7) {
      return {
        flagged: true,
        reason: 'Aggressive Behavior / Shouting (AI Detected)'
      };
    }
  }

  // 3. Spam / Suspicious Link Patterns
  const linkCount = (text.match(/http/g) || []).length;
  if (linkCount > 2) {
    return {
      flagged: true,
      reason: 'Potential Spam / Excessive Links (AI Detected)'
    };
  }

  return { flagged: false };
};
