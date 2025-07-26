"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"


import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 2 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
             
                <img
                    src={`/image${index+1}.png`}
                    alt={`Image ${index + 1}`}
                    className="object-cover rounded-lg"
                  />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    
    </Carousel>
  )
}

export default CarouselPlugin;
