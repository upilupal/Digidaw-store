import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

interface ImageItem {
  alt: string;
  imageUrl: string;
}

const imageList: ImageItem[] = [
  { alt: "banner1", imageUrl: "/jumbotron/banner1.webp" },
  { alt: "banner2", imageUrl: "/jumbotron/banner2.webp" },
  { alt: "banner3", imageUrl: "/jumbotron/banner5.webp" },
  { alt: "banner4", imageUrl: "/jumbotron/banner6.webp" },
];

const Jumbotron = () => {
  
  return (
    <>
    <Carousel className="md:w-5/6 mx-auto my-2 md:my-5" opts={{ loop: true }}>
      <CarouselContent className="">
        {imageList.map((item, index) => (
          <CarouselItem key={index} className="min-w-full">
            <div className="p-1">
              <Card className="border-none shadow-none">
                <CardContent className="flex justify-center items-center p-1">
                  <img src={item.imageUrl} alt={item.alt} className="w-full h-auto" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:block"/>
      <CarouselNext className="hidden md:block"/>
    </Carousel>
    </>
  );
};

export default Jumbotron;
