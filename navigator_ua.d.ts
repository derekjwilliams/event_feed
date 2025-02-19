interface NavigatorUAData {
  getHighEntropyValues(hints: string[]): Promise<Record<string, any>>
  // Add any additional properties you need
}

interface Navigator {
  userAgentData?: NavigatorUAData
}
