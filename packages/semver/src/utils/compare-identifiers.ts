/**
 * Compares two identifiers.
 *
 * Numeric identifiers are sorted in ascending order and non-numeric ones in ascending, case-sensitive, order of ASCII value.
 * @param a - The first identifier to compare.
 * @param b - The second identifier to compare.
 * @return `0` if `a` and `b` are equal, `1` if `a` is greater than `b`, `-1` if `b` is greater than `a`.
 */
export const compareIdentifiers = (a: string | number, b: string | number): 1 | 0 | -1 => {
  const result = String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "case"
  });
  return result ? (result > 0 ? 1 : -1) : 0;
};
