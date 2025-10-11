import Container from "../../Shared/Container/Container";
import SectionHeading from "../../Reusable/SectionHeading/SectionHeading";
import { useGetAllPhotosQuery } from "../../../redux/Features/PhotoGallery/photoGalleryApi";

type TPhotoGallery = {
  _id: string;
  title: string;
  poster: {
    public_id: string;
    url: string;
  };
};
const Gallery = () => {
  const { data } = useGetAllPhotosQuery({});
  console.log(data);
  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-b from-white to-slate-100">
      <Container>
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeading
            heading="Online Learning in Action"
            description="Peek into PMGURUKKUL’s virtual learning world — live sessions, interactive mentorship, and inspiring student success moments."
          />

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {data?.photos?.map((item: TPhotoGallery) => (
              <div
                key={item?._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-64">
                  <img
                    src={item?.poster?.url}
                    alt={item?.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white tracking-wide">
                      {item?.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Gallery;
