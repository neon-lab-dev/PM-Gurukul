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

    addPhoto: builder.mutation({
      query: (data) => ({
        url: `/photoGallery/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["photoGallery"],
    }),

    deletePhoto: builder.mutation({
      query: (id) => ({
        url: `/photoGallery/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["photoGallery"],
    }),
  }),
});

export const { useGetAllPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photoGalleryApi;
