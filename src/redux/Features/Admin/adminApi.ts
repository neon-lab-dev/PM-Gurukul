import { baseApi } from "../../Api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getAllUser: builder.query({
      query: () => ({
        url: "/all/user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getAllPendingKYC: builder.query({
      query: () => ({
        url: "/user/kyc/pending",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getAllEarnings: builder.query({
      query: () => ({
        url: "/earnings",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["earning"],
    }),

    getWeeklyPayouts: builder.query({
      query: () => ({
        url: "/weekly-earnings",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["payout"],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/all-orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getSingleOrderById: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getSingleUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getAllCourses: builder.query({
      query: ({searchQuery}) => ({
        url: `/courses?keyword=${searchQuery}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),

    approveKyc: builder.mutation({
      query: (id) => ({
        url: `/user/approve/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    rejectKyc: builder.mutation({
      query: (id) => ({
        url: `/user/reject/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    updateUserDetails: builder.mutation({
      query: (arg) => {
        const { id, formData } = arg;
        return {
          url: `/user/${id}`,
          method: "PUT",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["user"],
    }),

    // To get all the pending payouts overall
    approvePayout: builder.mutation({
      query: (id) => ({
        url: `/approve/payout/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["earning"],
    }),

    // To get all the pending weekly payouts
    approveWeeklyPayout: builder.mutation({
      query: (id) => ({
        url: `/approve-payout/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["payout"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    createCourse: builder.mutation({
      query: (courseData) => ({
        url: `/createcourse`,
        method: "POST",
        body: courseData,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    updateCourse: builder.mutation({
      query: ({id, courseData}) => ({
        url: `/update-course/${id}`,
        method: "PUT",
        body: courseData,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    addVideo: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/course/${courseId}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    deleteVideo: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/lectures?courseId=${courseId}&lectureId=${lectureId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAllUserQuery,
  useGetAllPendingKYCQuery,
  useGetAllEarningsQuery,
  useGetWeeklyPayoutsQuery,
  useGetAllOrdersQuery,
  useGetSingleOrderByIdQuery,
  useGetSingleUserByIdQuery,
  useUpdateUserDetailsMutation,
  useGetAllCoursesQuery,
  useApproveKycMutation,
  useRejectKycMutation,
  useApprovePayoutMutation,
  useApproveWeeklyPayoutMutation,
  useDeleteCourseMutation,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useAddVideoMutation,
  useDeleteVideoMutation,
} = adminApi;
