export interface WordFormType {
  noLetter: Array<string>
  hasLetter: Array<string>
  letter1: string
  letter2: string
  letter3: string
  letter4: string
  letter5: string
}

export interface MatchWord {
  wordleWord: Array<string>
}

export interface EnglishDefinitionAPI {
  word: string
  phonetic: string
  phonetics: [
    {
      text?: string
      audio?: string
      sourceUrl?: string
      license: {
        name?: string
        url?: string
      }
    }
  ]
  meanings: [
    {
      partOfSpeech?: string
      definitions?: [
        {
          definition?: string
          synonyms?: []
          antonyms?: []
          example?: string
        },
        
      ]
      synonyms?: []
      antonyms?: []
    }
  ]
  license: {
    name?: string
    url?: string
  }
  sourceUrls: []
}
