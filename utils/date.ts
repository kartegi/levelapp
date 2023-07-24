const addZero = (value: number) => (value < 10 ? "0" + value : value);

export const getFormatedDate = (dateIso: string) => {
  const date = new Date(dateIso);
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth());
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
