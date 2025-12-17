import { baseApi } from "../../Api/baseApi";

const courseBundleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseBundles: builder.query({
      query: (searchQuery) => ({
        url: `/courseBundle?keyword=${searchQuery}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["courseBundle"],
    }),

    getSingleCourseBundleById: builder.query({
      query: (id) => ({
        url: `/courseBundle/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["courseBundle"],
    }),

    createCourseBundle: builder.mutation({
      query: (data) => ({
        url: `/courseBundle/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["courseBundle"],
    }),

    deleteCourseBundle: builder.mutation({
      query: (id) => ({
        url: `/courseBundle/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["courseBundle"],
    }),

    updateCourseBundle: builder.mutation({
      query: ({ data, id }) => ({
        url: `/courseBundle/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["courseBundle"],
    }),
  }),
});

export const {
  useGetAllCourseBundlesQuery,
  useGetSingleCourseBundleByIdQuery,
  useCreateCourseBundleMutation,
  useDeleteCourseBundleMutation,
  useUpdateCourseBundleMutation,
} = courseBundleApi;
