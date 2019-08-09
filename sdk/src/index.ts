if (typeof Symbol === 'undefined' || typeof XMLHttpRequest === 'undefined') {
  throw new Error('tracker requires ie10+')
}

try {
  process.env.NODE_ENV
} catch (e) {
  const g: any = typeof window !== 'undefined' ? window : global
  if (typeof process === 'undefined') g.process = {}
  g.process.env = {}
}

export * from './internal'
