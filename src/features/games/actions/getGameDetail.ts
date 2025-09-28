import { GAMES } from "@/features/games/constants/data";

export const getGameDetail = async (youtubeId: string) => {
  const game = GAMES.find((game) => game.youtubeId === youtubeId);
  if (!game) throw new Error(`Game with id ${youtubeId} not found`);
  return game;
};
