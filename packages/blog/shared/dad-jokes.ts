export const DAD_JOKES: readonly string[] = [
  'I only know 25 letters of the alphabet. I don\u2019t know y.',
  'Why did the scarecrow win an award? He was outstanding in his field.',
  'I used to hate facial hair, but then it grew on me.',
  'What do you call a fake noodle? An impasta.',
  'I\u2019m reading a book about anti-gravity. It\u2019s impossible to put down.',
  'Why don\u2019t skeletons fight each other? They don\u2019t have the guts.',
  'I told my wife she was drawing her eyebrows too high. She looked surprised.',
  'Why did the coffee file a police report? It got mugged.',
  'Why don\u2019t eggs tell jokes? They\u2019d crack each other up.',
  'What do you call cheese that isn\u2019t yours? Nacho cheese.',
  'I would tell you a construction joke, but I\u2019m still working on it.',
  'Parallel lines have so much in common. It\u2019s a shame they\u2019ll never meet.',
  'Why did the bicycle fall over? Because it was two tired.',
  'I used to be a banker, but then I lost interest.',
  'What\u2019s brown and sticky? A stick.',
] as const;

export function pickDadJoke(): string {
  return DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)]!;
}
