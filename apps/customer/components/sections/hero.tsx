import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const wavyUnderline =
  "url(\"data:image/svg+xml,%3Csvg width='400' height='24' viewBox='0 0 400 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 12C20 4 35 4 50 12C65 20 80 20 95 12C110 4 125 4 140 12C155 20 170 20 185 12C200 4 215 4 230 12C245 20 260 20 275 12C290 4 305 4 320 12C335 20 350 20 365 12C380 4 390 4 400 8' stroke='%23E7E1B1' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E\")";

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#306D29] pt-10 pb-20 md:min-h-screen">
      <div className="mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="inline-block bg-no-repeat pb-4 text-7xl leading-none font-extrabold text-[#E7E1B1] sm:text-6xl md:pb-6 md:text-8xl lg:text-9xl">
            Nature Foods
            <br />
            Origin
          </h1>

          <div className="mt-6">
            <Button variant="primary" size="lg">
              <Link href="/order-now" className="flex items-center gap-2">
                Order Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero */}
        <div className="mx-auto mt-16 flex max-w-[1300px] flex-col-reverse items-center gap-12 lg:mt-12 lg:flex-row-reverse lg:gap-20">
          {/* Content */}
          <div className="flex flex-1 items-center justify-center">
            <div className="flex max-w-2xl flex-col items-center gap-2">
              {/* <h2 className="text-center text-5xl md:text-8xl font-extrabold text-white uppercase">
                Delicious &
              </h2>
              <h2 className="text-center text-5xl md:text-8xl font-extrabold text-white uppercase">
                Fresh Food,
              </h2>
              <h2 className="text-center text-5xl md:text-8xl font-extrabold text-white uppercase">
                Naturally.
              </h2> */}

              <p className="max-w-xl text-center text-3xl leading-10 text-neutral-300 md:text-5xl md:leading-15">
                Discover wholesome meals crafted with fresh, locally sourced
                ingredients and prepared daily with care. From nourishing bowls
                to refreshing juices, every bite celebrates the goodness of
                nature while delivering exceptional taste.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-1 justify-center">
            <Image
              src="/images/hero.png"
              alt="Nature Food"
              width={700}
              height={700}
              priority
              className="h-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
