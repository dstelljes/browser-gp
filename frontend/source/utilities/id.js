const names = [
  'aladdin', 'allegro', 'amazon', 'ansel', 'antares', 'apex', 'apollo',
  'artemis', 'asahi', 'atlanta', 'atlantic', 'aurora', 'autobahn', 'beaker',
  'bismol', 'blackbird', 'bongo', 'brooks', 'bunsen', 'cabernet', 'capone',
  'catalyst', 'chablis', 'cheetah', 'chimera', 'cinnamon', 'civic', 'clockwork',
  'cobra', 'comet', 'converse', 'crusader', 'cupid', 'cyan', 'cyclone',
  'cypher', 'darwin', 'derringer', 'dulcimer', 'eclipse', 'elixir', 'epic',
  'escher', 'espirit', 'excalibur', 'figment', 'flagship', 'fortissimo',
  'freeport', 'fridge', 'gazelle', 'gemini', 'gossamer', 'gonzo', 'hacksaw',
  'hammerhead', 'harmony', 'hero', 'hokusai', 'hook', 'hooper', 'horizon',
  'innsbruck', 'ivory', 'jaguar', 'kanga', 'kirkwood', 'kodiak', 'laguna',
  'leopard', 'lion', 'lisa', 'macintosh', 'marble', 'malibu', 'maui',
  'mavericks', 'mercury', 'milwaukee', 'minuet', 'monet', 'montana', 'mustang',
  'nautilus', 'nexus', 'nitro', 'omega', 'onyx', 'optimus', 'panther', 'paris',
  'phoenix', 'pinball', 'pomona', 'puma', 'prism', 'reno', 'rhapsody',
  'rosebud', 'rubicon', 'sonata', 'skia', 'stealth', 'singray', 'sundance',
  'tailgate', 'tangent', 'tempest', 'tempo', 'terminator', 'tiger', 'titan',
  'trailblazer', 'trinity', 'tsunami', 'typhoon'
]

export const createRandomId = length => {
  return Array(length)
    .fill()
    .map(() => names[Math.floor(Math.random() * names.length)])
    .join('-')
}
