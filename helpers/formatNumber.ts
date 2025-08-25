export const formatNumber = (number: number | string): string => {
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) return '0';
  
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};
