import { DefaultSession } from "next-auth";

interface AuthUser {
  name: string;
  email: string;
  picture?: string | null;
  image?: string | null;
  accessToken: string;
  sub: string;
  expires_at: number;
}

export interface AuthSession extends Omit<DefaultSession, "user"> {
  user: AuthUser;
}

interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Album {
    id: string;
    name: string;
    artists: Artist[];
    images: Image[];
    album_type?: string;
    release_date: string;
    tracks: {
      total: number;
      items: Track[];
    };
  }
  
  export interface Artist {
    id: string;
    name: string;
    images: Image[];
    followers?: {
      total: number;
    };
    genres?: string[];
  }

export interface Track {
    id: string;
    name: string;
    album: Album;
    artists: Artist[];
    duration_ms: number;
    preview_url: string;
  }