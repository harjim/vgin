export const useEnv = (env: Recordable): ImportMetaEnv => {
  const ret: any = {}
  for (const envKey of Object.keys(env)) {
    let envVal = env[envKey]

    envVal = envVal === 'true' ? true : envVal === 'false' ? false : envVal

    if (/^[1-9]+[0-9]*]*$/.test(envVal)) {
      envVal = parseInt(envVal)
    }

    ret[envKey] = envVal
  }
  return ret
}
