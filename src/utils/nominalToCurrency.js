export const nominalToCurrency = (num) => {
  return 'Rp' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}