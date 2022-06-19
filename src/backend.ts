export const API: any = {
  URL: 'http://ec2-54-170-162-0.eu-west-1.compute.amazonaws.com',
  PORT: 8080,
  PATH: 'api',
  GET_ENDPOINT: (params: string[]): string => {
    const hasPort = API.PORT ? `:${API.PORT}` : ''
    const baseUrl = `${API.URL}${hasPort ? ':' + API.PORT : ''}/${API.PATH}`
    return params.length > 0 ? `${baseUrl}/${params.join('/')}` : baseUrl
  }
}
