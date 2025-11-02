export const versions: [string, number, { loose: boolean }?][] = [
  ["1.2.1", 1],
  [" 1.2.1 ", 1],
  [" 1.2.2-4 ", 2],
  [" 1.2.3-pre ", 3],
  ["\t1.2.13", 13],
  ["v1.2.5", 5, { loose: true }],
  [" v1.2.8 ", 8, { loose: true }],
  ["=1.2.21", 21, { loose: true }],
  ["v=1.2.34", 34, { loose: true }]
];
