export function isCIEnv(): { isCI: boolean; msg: string } {
  return {
    isCI: process.env.CI === 'true',
    msg: 'Do not run screenshot tests on CI',
  };
}
