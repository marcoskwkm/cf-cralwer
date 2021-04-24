export const ensureNewLineAtEndOfString = (str: string) =>
  str.endsWith('\n') ? str : str + '\n'
