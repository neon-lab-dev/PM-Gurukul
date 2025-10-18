import { baseApi } from "../../Api/baseApi";

const businessPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinessPlanDocs: builder.query({
      query: () => ({
        url: "/businessPlan",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["businessPlan"],
    }),
    getSingleBusinessPlanDocById: builder.query({
      query: (id) => ({
        url: `/businessPlan/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["businessPlan"],
    }),

    addBusinessPlanDoc: builder.mutation({
      query: (data) => ({
        url: `/businessPlan/upload`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["businessPlan"],
    }),

    updateBusinessPlanDoc: builder.mutation({
      query: (id) => ({
        url: `/businessPlan/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["businessPlan"],
    }),

    deleteBusinessPlanDoc: builder.mutation({
      query: (id) => ({
        url: `/businessPlan/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["businessPlan"],
    }),
  }),
});

export const {
  useGetAllBusinessPlanDocsQuery,
  useGetSingleBusinessPlanDocByIdQuery,
  useAddBusinessPlanDocMutation,
  useUpdateBusinessPlanDocMutation,
  useDeleteBusinessPlanDocMutation,
} = businessPlanApi;
