
// Call a fetch to the url and parses the response 
export function apiRequest<TResponse>(
    url: string,
    config: RequestInit = {}
): Promise<TResponse> {
    return fetch(url, config)
        .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                // Handle API error responses
                const errorMessage = data.message || 'Something went wrong';
                throw new Error(errorMessage);
            }
            return data as TResponse;
        })
        .catch((error) => {
            // Handle network or parsing errors
            const errorMessage = error.message || 'Network error occurred';
            throw error;
        });
}