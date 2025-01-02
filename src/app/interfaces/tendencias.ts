export interface Tendencias {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Tendencias {
  page: number;
  results: Tendencias[];
  total_pages: number;
  total_results: number;
}
