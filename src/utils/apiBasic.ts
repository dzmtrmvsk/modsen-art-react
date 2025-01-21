const fetchFromApi = async (endpoint: string, params: Record<string, any> = {}) => {
  const url = new URL(endpoint)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value))
    }
  })

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error((await response.text()) || 'Error fetching data.')
  }
  return response.json()
}

export { fetchFromApi }
