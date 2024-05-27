interface FetchWrapperResponse<T> {
  status: {
    code: number;
    message: string;
  };
  data: T | null;
  error: any | null;
  meta?: any;
}

export const fetchWrapper = async <T = any>(
  url: string,
  options?: RequestInit
): Promise<FetchWrapperResponse<T>> => {
  const token = localStorage.getItem("authToken");

  let fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };

  let fullUrl = url;
  if (!fullUrl.includes("http")) {
    fullUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${url}`;
  }

  try {
    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: {
          code: response.status,
          message: response.statusText,
        },
        data: null,
        error: errorData,
      };
    }

    const data: T = await response.json();
    return {
      status: {
        code: response.status,
        message: "Success",
      },
      data,
      error: null,
    };
  } catch (error) {
    return {
      status: {
        code: 500,
        message: "Network error",
      },
      data: null,
      error,
    };
  }
};
