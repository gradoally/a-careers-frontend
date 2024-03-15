export function truncateMiddleText(text: string = "", length: number): string {
  const newTextLength = 2 * length + 3;
  if (text.length <= newTextLength) return "";
  const leftSubText = text.slice(0, length);
  const rightSubText = text.slice(text.length - length);
  return `${leftSubText}...${rightSubText}`;
}
