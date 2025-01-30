export const timeStringToFloat = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return <number>hours + <number>minutes / 60;
}

export const floatToTimeString = (time: number): string => {
  // Get the integer part as hours
  const hours = Math.floor(time);

  // Get the fractional part and convert it to minutes
  const minutes = Math.round((time - hours) * 60);

  // Format the hours and minutes into a `HH:mm` string
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
