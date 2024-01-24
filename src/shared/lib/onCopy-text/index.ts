export const onCopyText = (text: string) => () => {
  navigator.clipboard.writeText(text);
};
