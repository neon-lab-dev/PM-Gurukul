import { baseApi } from "../../Api/baseApi";

const photoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPhotos: builder.query({
      query: () => ({
        url: "/photoGallery",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["photoGallery"],
    }),
  }),
});

export const { useGetAllPhotosQuery } = photoGalleryApi;
