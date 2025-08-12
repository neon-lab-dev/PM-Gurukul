import { baseApi } from "../../Api/baseApi";

const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCertificates: builder.query({
      query: () => ({
        url: "/certificate",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["certificate"],
    }),
  }),
});

export const { useGetMyCertificatesQuery } = certificateApi;
