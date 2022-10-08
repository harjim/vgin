export const useEnv = (env: Recordable<unknown>): ImportMetaEnv => {
  const ret: unknown = {}
  for (const envKey of Object.keys(env)) {
    let envVal = env[envKey]

    envVal = envVal === 'true' ? true : envVal === 'false' ? false : envVal

    if (/^[1-9]+[0-9]*]*$/.test(envVal as string)) {
      envVal = parseInt(envVal as string)
    }

    ret[envKey] = envVal
  }
  return ret as ImportMetaEnv
}
