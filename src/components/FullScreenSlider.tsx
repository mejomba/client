'use client'; // This directive is necessary for using React hooks like useState, useEffect

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Array of images for the slider
const sliderImages = [
  { id: 1, src: '/images/s1.png', alt: 'Image 1' },
  { id: 2, src: '/images/s2.png', alt: 'Image 2' },
  { id: 3, src: '/images/s3.png', alt: 'Image 3' }
];

export default function FullScreenSlider() {
  return (
    <div className="relative h-[50vh] w-full">
      <Swiper
        // Install Swiper modules
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full w-full"
      >
        {sliderImages.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="h-full w-full">
              {/* Aspect Ratio Container */}
              <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
                 {/* For Tailwind CSS v3.3+ you can use aspect-[16/6] */}
                <div className="relative w-full max-w-4xl aspect-[32/9]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}