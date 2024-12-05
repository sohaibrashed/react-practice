import { Button } from "@/components/ui/button";
import { CheckCircleIcon, ShoppingBagIcon, SparklesIcon } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen py-10">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About <span className="text-pink-600">Clothify</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          At Clothify, we redefine fashion by combining style, comfort, and
          sustainability. Explore the essence of modern clothing tailored to
          perfection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out
"
          >
            <CheckCircleIcon
              className="text-pink-600 w-12 h-12 mx-auto mb-4 animate-bounce hover:animate-none
"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Quality Craftsmanship
            </h3>
            <p className="text-gray-600">
              Every product is crafted with precision and a commitment to
              excellence.
            </p>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out
"
          >
            <ShoppingBagIcon
              className="text-pink-600 w-12 h-12 mx-auto mb-4 animate-bounce hover:animate-none
"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Customer First
            </h3>
            <p className="text-gray-600">
              Your satisfaction is our top priority, with a seamless shopping
              experience.
            </p>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out
"
          >
            <SparklesIcon
              className="text-pink-600 w-12 h-12 mx-auto mb-4 animate-bounce hover:animate-none
"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Sustainable Fashion
            </h3>
            <p className="text-gray-600">
              We are committed to creating fashion that respects the planet.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center place-items-center ">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-6">
              Founded with a vision to make high-quality, stylish clothing
              accessible to everyone, Clothify has grown into a brand loved by
              fashion enthusiasts worldwide. Our journey started with a passion
              for design and a promise of integrity.
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              Learn More
            </Button>
          </div>
          <div className="flex gap-2">
            <img
              src="/about-img-1.webp"
              alt="About Clothify"
              className="rounded-lg shadow-lg w-1/2"
            />
            <div className="space-y-3">
              <img
                src="/about-img-2.webp"
                alt="About Clothify"
                className="rounded-lg shadow-lg w-1/2"
              />
              <img
                src="/about-img-3.webp"
                alt="About Clothify"
                className="rounded-lg shadow-lg w-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
