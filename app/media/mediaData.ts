import { MediaCategory } from './types';

export const MEDIA_CATEGORIES: MediaCategory[] = [
  {
    id: 'games',
    title: 'Top 10 Games',
    media: [
      {
        id: 'game-1',
        title: 'Elder Peak',
        type: 'game',
        coverUrl: '/images/media/adventure_game_cover_1776401332423.png',
        whyILikeIt: 'Breathtaking open-world exploration and world-building.',
        rotation: '-rotate-2'
      },
      {
        id: 'game-2',
        title: 'Neon Shadows',
        type: 'game',
        coverUrl: '/images/media/cyberpunk_game_cover_1776401372929.png',
        whyILikeIt: 'The immersive atmosphere of a decaying future.',
        rotation: 'rotate-3'
      },
      {
        id: 'game-3',
        title: 'Void Drifter',
        type: 'game',
        coverUrl: '/images/media/space_game_cover_1776401388514.png',
        whyILikeIt: 'A masterpiece of cosmic horror and solitude.',
        rotation: '-rotate-1'
      },
      {
        id: 'game-4',
        title: 'Dunk Master',
        type: 'game',
        coverUrl: '/images/media/sports_game_cover_1776401503931.png',
        whyILikeIt: 'Pure mechanical satisfaction and competitive depth.',
        rotation: 'rotate-4'
      },
      {
        id: 'game-5',
        title: 'Metropolis Builder',
        type: 'game',
        coverUrl: '/images/media/simulation_game_cover_1776401485792.png',
        whyILikeIt: 'Complex systems that interact in unpredictable ways.',
        rotation: '-rotate-2'
      },
      {
        id: 'game-6',
        title: 'Siege of Kingdoms',
        type: 'game',
        coverUrl: '/images/media/strategy_game_cover_1776401445759.png',
        whyILikeIt: 'Tactical brilliance and high-stakes decision making.',
        rotation: 'rotate-1'
      },
      {
        id: 'game-7',
        title: 'Noir Night',
        type: 'game',
        coverUrl: '/images/media/mystery_game_cover_1776401465309.png',
        whyILikeIt: 'A slow-burn detective story with incredible writing.',
        rotation: '-rotate-3'
      },
      {
        id: 'game-8',
        title: 'Coastal Burn',
        type: 'game',
        coverUrl: '/images/media/racing_game_cover_1776401428573.png',
        whyILikeIt: 'The sense of speed and technical mastery required.',
        rotation: 'rotate-2'
      },
      {
        id: 'game-9',
        title: 'Dragon Slayer',
        type: 'game',
        coverUrl: '/images/media/rpg_game_cover_1_1776401352039.png',
        whyILikeIt: 'A classic journey that feels personal and epic.',
        rotation: '-rotate-4'
      },
      {
        id: 'game-10',
        title: 'The Silent Hill',
        type: 'game',
        coverUrl: '/images/media/horror_game_cover_1776401408412.png',
        whyILikeIt: 'Unparalleled atmosphere and psychological depth.',
        rotation: 'rotate-3'
      }
    ]
  },
  {
    id: 'movies',
    title: 'Top 10 Movies',
    media: [
      {
        id: 'movie-1',
        title: 'Event Horizon II',
        type: 'movie',
        coverUrl: '/images/media/scifi_movie_poster_1776403154421.png',
        whyILikeIt: 'Visual spectacle combined with deep philosophical questions.',
        rotation: '-rotate-3'
      },
      {
        id: 'movie-2',
        title: 'Bridge to Nowhere',
        type: 'movie',
        coverUrl: '/images/media/drama_movie_poster_1776403193335.png',
        whyILikeIt: 'A heart-wrenching character study on isolation.',
        rotation: 'rotate-2'
      },
      {
        id: 'movie-3',
        title: 'The Steel Garden',
        type: 'movie',
        coverUrl: '/images/media/animated_movie_poster_1776403229561.png',
        whyILikeIt: 'Breathtaking animation and a story about friendship.',
        rotation: '-rotate-1'
      },
      {
        id: 'movie-4',
        title: 'Neon Odyssey',
        type: 'movie',
        coverUrl: '/images/media/cyberpunk_game_cover_1776401372929.png',
        whyILikeIt: 'A visual masterpiece that redefines the genre.',
        rotation: 'rotate-4'
      },
      {
        id: 'movie-5',
        title: 'The Last Expedition',
        type: 'movie',
        coverUrl: '/images/media/adventure_game_cover_1776401332423.png',
        whyILikeIt: 'An epic tale of survival against all odds.',
        rotation: '-rotate-2'
      },
      {
        id: 'movie-6',
        title: 'Solaris Reach',
        type: 'movie',
        coverUrl: '/images/media/space_game_cover_1776401388514.png',
        whyILikeIt: 'Tense, psychological drama set in deep space.',
        rotation: 'rotate-1'
      },
      {
        id: 'movie-7',
        title: 'Midnight in the Attic',
        type: 'movie',
        coverUrl: '/images/media/horror_series_poster_1776403211272.png',
        whyILikeIt: 'A masterclass in tension and subverting expectations.',
        rotation: '-rotate-3'
      },
      {
        id: 'movie-8',
        title: 'Sovereign Fall',
        type: 'movie',
        coverUrl: '/images/media/strategy_game_cover_1776401445759.png',
        whyILikeIt: 'Epic historical drama with incredible production value.',
        rotation: 'rotate-2'
      },
      {
        id: 'movie-9',
        title: 'The Fog of War',
        type: 'movie',
        coverUrl: '/images/media/mystery_game_cover_1776401465309.png',
        whyILikeIt: 'A complex thriller that keeps you guessing until the end.',
        rotation: '-rotate-4'
      },
      {
        id: 'movie-10',
        title: 'Digital Dreams',
        type: 'movie',
        coverUrl: '/images/media/simulation_game_cover_1776401485792.png',
        whyILikeIt: 'Hypnotic visuals and a really unique narrative structure.',
        rotation: 'rotate-3'
      }
    ]
  },
  {
    id: 'series',
    title: 'Top 10 Webseries',
    media: [
      {
        id: 'series-1',
        title: 'Throne of Embers',
        type: 'series',
        coverUrl: '/images/media/fantasy_series_poster_1776403176522.png',
        whyILikeIt: 'The scale of the world and the deep political intrigue.',
        rotation: '-rotate-2'
      },
      {
        id: 'series-2',
        title: 'Echoes of Silence',
        type: 'series',
        coverUrl: '/images/media/horror_series_poster_1776403211272.png',
        whyILikeIt: 'A terrifying slow-burn that builds perfectly over time.',
        rotation: 'rotate-3'
      },
      {
        id: 'series-3',
        title: 'Circuit Breakers',
        type: 'series',
        coverUrl: '/images/media/cyberpunk_game_cover_1776401372929.png',
        whyILikeIt: 'A unique look at human-AI relations in a gritty setting.',
        rotation: '-rotate-1'
      },
      {
        id: 'series-4',
        title: 'The Highliners',
        type: 'series',
        coverUrl: '/images/media/racing_game_cover_1776401428573.png',
        whyILikeIt: 'High-adrenaline racing drama with heart.',
        rotation: 'rotate-4'
      },
      {
        id: 'series-5',
        title: 'Chronicles of Astra',
        type: 'series',
        coverUrl: '/images/media/space_game_cover_1776401388514.png',
        whyILikeIt: 'Episodic wonder and scientific curiosity.',
        rotation: '-rotate-2'
      },
      {
        id: 'series-6',
        title: 'Empire Records',
        type: 'series',
        coverUrl: '/images/media/strategy_game_cover_1776401445759.png',
        whyILikeIt: 'Captivating performances and a tragic family saga.',
        rotation: 'rotate-1'
      },
      {
        id: 'series-7',
        title: 'The Investigator',
        type: 'series',
        coverUrl: '/images/media/mystery_game_cover_1776401465309.png',
        whyILikeIt: 'Gritty, realistic crime drama at its finest.',
        rotation: '-rotate-3'
      },
      {
        id: 'series-8',
        title: 'Life in Bloom',
        type: 'series',
        coverUrl: '/images/media/simulation_game_cover_1776401485792.png',
        whyILikeIt: 'A thoughtful exploration of life and growth.',
        rotation: 'rotate-2'
      },
      {
        id: 'series-9',
        title: 'Legends Born',
        type: 'series',
        coverUrl: '/images/media/sports_game_cover_1776401503931.png',
        whyILikeIt: 'Inspirational sports stories that transcend the game.',
        rotation: '-rotate-4'
      },
      {
        id: 'series-10',
        title: 'Forgotten Realms',
        type: 'series',
        coverUrl: '/images/media/adventure_game_cover_1776401332423.png',
        whyILikeIt: 'Endless mystery and a sense of discovery in every episode.',
        rotation: 'rotate-3'
      }
    ]
  }
];
