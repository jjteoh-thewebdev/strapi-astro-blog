interface Props {
  baseUrl: string;
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  auth?: boolean;
  authToken: string;
  // page?: number;
  locale?: string;
}

export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @param auth - to enable auth
 * @param locale - get content in different language, check strapi doc for supported locale
 * @returns
 */
export default async function fetchApi<T>({
  baseUrl,
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
  auth = true,
  authToken,
  locale,
  // page,
}: Props): Promise<T | undefined> {
  try {
    if (endpoint.startsWith("/")) {
      endpoint = endpoint.slice(1);
    }

    const url = new URL(`${baseUrl}/api/${endpoint}`);

    if (locale) {
      url.searchParams.append("locale", locale);
    }

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // if (page) {
    //   url.searchParams.append(`populate[${page}][populate]`, "*");
    // } else {
    //   url.searchParams.append("populate", "*");
    // }

    let token: string | undefined = undefined;
    if (auth) {
      token = authToken;
    }

    const res = await fetch(
      url.toString(),
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined,
    );

    if (res.status >= 300) {
      console.error(res.status, res.statusText);
      console.error(res.blob);
      return undefined;
    }

    let data = await res.json();

    if (wrappedByKey) {
      data = data[wrappedByKey];
    }

    if (wrappedByList) {
      data = data[0];
    }

    return data as T;
  } catch (ex: any) {
    console.error("Error:", ex.response?.data || ex.message);
  }

  return undefined;
}
