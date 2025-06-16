export async function APIRequest({
  url,
  method = "POST",
  headers,
  data,
  additionalInfo,
}: {
  url: string;
  method?: string | undefined;
  headers?: any;
  data?: any;
  additionalInfo?: object;
}) {
  return await fetch(url, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    ...(data && { body: JSON.stringify(data) }),
    ...additionalInfo,
  })
    .then(async (res) => {
      const response = await res.json();
      if (response.success === false) {
        throw response;
      }
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
