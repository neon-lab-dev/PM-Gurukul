import { baseApi } from "../../Api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: (searchQuery) => ({
        url: `/courses?keyword=${searchQuery}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),

    getSingleCourseById: builder.query({
      query: (id) => ({
        url: `/course/single/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),

    getCourseLecture: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),

    addThread: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `/courses/${courseId}/forum`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    deleteThread: builder.mutation({
      query: ({ courseId, id }) => ({
        url: `/${courseId}/forum/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetSingleCourseByIdQuery,
  useGetCourseLectureQuery,
  useGetAllCategoriesQuery,
  useAddThreadMutation,
  useDeleteThreadMutation,
} = courseApi;
