import { baseApi } from "../../Api/baseApi";

const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTestimonials: builder.query({
      query: () => ({
        url: "/testimonial",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["testimonial"],
    }),

    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonial/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["testimonial"],
    }),
  }),
});

export const { useGetAllTestimonialsQuery, useDeleteTestimonialMutation } = testimonialApi;
