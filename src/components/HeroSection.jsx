import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HeroSection() {
  return (
    <section className="relative bg-gray-100">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Step into Style, <br className="hidden lg:block" />
            Redefine Your Wardrobe
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Discover the latest trends in fashion and enjoy exclusive deals on
            premium clothing.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:text-gray-900"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Carousel
            className="w-full sm:max-w-xl max-w-md rounded-lg shadow-lg"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              <CarouselItem>
                <img
                  loading="eager"
                  src="/hero-section-1.webp"
                  alt="Stylish clothing 1"
                  className="w-full rounded-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/hero-section-2.webp"
                  alt="Stylish clothing 2"
                  className="w-full rounded-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/hero-section-3.webp"
                  alt="Stylish clothing 3"
                  className="w-full rounded-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/hero-section-4.webp"
                  alt="Stylish clothing 3"
                  className="w-full rounded-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/hero-section-5.webp"
                  alt="Stylish clothing 3"
                  className="w-full rounded-lg"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 to-white"></div>
    </section>
  );
}
