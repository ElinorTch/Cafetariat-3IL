export const getTotalPrice = (reservation: any) => {
  let total = 0;
  for (const reservationItem of reservation.reservationItem)
    total += reservationItem.total;
  return total;
};
