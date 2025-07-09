import { baseApi } from "../../Api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getMyPurchasedCourses: builder.query({
      query: () => ({
        url: "/purchased/course",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user", "course"],
    }),

    myReferralSummary: builder.query({
      query: () => ({
        url: "/refral/summary",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/myprofile",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    myOrders: builder.query({
      query: () => ({
        url: "/my-orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    updateProfile: builder.mutation({
      query: (profileUpdatedData) => ({
        method: "PUT",
        url: `/me/update`,
        body: profileUpdatedData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetMyPurchasedCoursesQuery,
  useMyReferralSummaryQuery,
  useGetMeQuery,
  useMyOrdersQuery,
  useUpdateProfileMutation,
} = userApi;
