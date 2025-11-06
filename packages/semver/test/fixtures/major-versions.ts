export const versions: [string, number, { loose: boolean }?][] = [
  ["1.2.3", 1],
  [" 1.2.3 ", 1],
  [" 2.2.3-4 ", 2],
  [" 3.2.3-pre ", 3],
  ["\t13.2.3", 13],
  ["v5.2.3", 5, { loose: true }],
  [" v8.2.3 ", 8, { loose: true }],
  ["=21.2.3", 21, { loose: true }],
  ["v=34.2.3", 34, { loose: true }]
];
