/**
 * Adds a leading zero to hours, minutes and seconds when necessary.
 * @param number - The hour, minute or second to parse.
 * @return The hour, minute or second formatted with a leading zero when necessary.
 */
const addLeadingZero = (number: number): string => String(number).padStart(2, "0");

export default addLeadingZero;
