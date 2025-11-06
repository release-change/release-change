export const versions: [string, number, { loose: boolean }?][] = [
  ["1.1.3", 1],
  [" 1.1.3 ", 1],
  [" 1.2.3-4 ", 2],
  [" 1.3.3-pre ", 3],
  ["\t1.13.3", 13],
  ["v1.5.3", 5, { loose: true }],
  [" v1.8.3 ", 8, { loose: true }],
  ["=1.21.3", 21, { loose: true }],
  ["v=1.34.3", 34, { loose: true }]
];
