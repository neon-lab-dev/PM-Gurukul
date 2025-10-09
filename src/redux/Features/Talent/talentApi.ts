import { baseApi } from "../../Api/baseApi";

const talentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTalents: builder.query({
      query: ({ talentType, keyword }) => {
        const params = new URLSearchParams();
        if (talentType && talentType !== "All") {
          params.append("talentType", talentType);
        }

        if (keyword) {
          params.append("keyword", keyword);
        }

        const queryString = params.toString();
        return {
          url: `/talent${queryString ? `?${queryString}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["talent"],
    }),

    getSingleTalentById: builder.query({
      query: (id) => ({
        url: `/talent/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["talent"],
    }),

    getMyTalents: builder.query({
      query: ({ talentType }) => {
        const params = new URLSearchParams();
        if (talentType && talentType !== "All") {
          params.append("talentType", talentType);
        }

        const queryString = params.toString();
        return {
          url: `/talent/my-talents${queryString ? `?${queryString}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["talent"],
    }),

    addTalent: builder.mutation({
      query: (data) => ({
        url: `/talent`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["talent"],
    }),

    deleteTalent: builder.mutation({
      query: (id) => ({
        url: `/talent/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["talent"],
    }),
  }),
});

export const {
  useGetAllTalentsQuery,
  useGetSingleTalentByIdQuery,
  useGetMyTalentsQuery,
  useAddTalentMutation,
  useDeleteTalentMutation,
} = talentApi;
