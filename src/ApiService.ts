export interface EtteillaApiServiceResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data?: T;
}

export interface EtteillaData {
  id: string;
  name: string;
  title: string;
  url: string;
  images?: {
    base: string;
    webp: string;
    avif: string;
    jpeg: string;
  };
  decks: number;
}

export interface EtteillaDeckData {
  id: string;
  updated: string;
  name: string;
  title: string;
  url: string;
  images?: {
    base: string;
    webp: string;
    avif: string;
    jpeg: string;
  };
  deckType: {
    name: string;
    url: string;
  };
  description: string;
}


export class EtteillaApiService<T> {
  private path: string;
  private lang: string;
  private baseUrl: string;

  private apiKey: string;

  constructor(path: string, lang: string) {
    this.path = path;
    this.lang = lang;
    this.apiKey = 'jak-1s0-12sa1';
    this.baseUrl = `http://localhost:8082/v1/${this.lang}/`;
  }

  async getList(): Promise<T[]> {
    const url = `${this.baseUrl}${this.path}?key=${this.apiKey}`;
    console.log(url)
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  }
}

