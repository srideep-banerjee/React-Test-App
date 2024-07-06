export function sendRequest(url: string, onSuccess: (data: object)=>void, onError: ()=>void, method?: string, body?: string) {
    const requestOptions = {
        method: method ? method : 'GET',
        body: body ? body : undefined,
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch(url, requestOptions)
    .then(response => {
        if (response.ok && response.status == 200) {
            return response.json()
        } else {
            throw new Error()
        }
    })
    .then(onSuccess)
    .catch(onError)
}