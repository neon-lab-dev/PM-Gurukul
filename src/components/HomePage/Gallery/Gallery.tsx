// Gallery.jsx
import React from 'react';
import Container from '../../Shared/Container/Container';
import SectionHeading from '../../Reusable/SectionHeading/SectionHeading';

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Interactive Live Sessions",
      image:
        "https://images.unsplash.com/photo-1584697964190-ffcb1d0a5f85?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Student Success Stories",
      image:
        "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Expert-Led Mentorship",
      image:
        "https://images.unsplash.com/photo-1584697964403-6d84dcbc3e9b?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Collaborative Group Learning",
      image:
        "https://images.unsplash.com/photo-1600195077075-97d47bcd9f9c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      title: "Hands-On Project Building",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 6,
      title: "Online Workshops & Hackathons",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
    },
  ];

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
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white tracking-wide">
                      {item.title}
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
