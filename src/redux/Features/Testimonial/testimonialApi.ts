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
  }),
});

export const { useGetAllTestimonialsQuery } = testimonialApi;
