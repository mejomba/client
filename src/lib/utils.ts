export const formatNumber = (num: number, locale: string = 'fa-IR') => {
  if (!num)
    return num
  return num.toLocaleString(locale);
};
