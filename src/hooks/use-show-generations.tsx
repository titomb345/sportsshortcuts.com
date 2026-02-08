export function useShowGenerations(playerName: string) {
  return {
    showGenerations: !!playerName,
  };
}
