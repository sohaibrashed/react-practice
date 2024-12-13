import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";

export default function ShopFilterSidebar() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-6 p-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>coming soon</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="sort">
          <AccordionTrigger>Sort</AccordionTrigger>
          <AccordionContent
            className={"flex flex-col justify-start items-start gap-2"}
          >
            <div className="flex space-x-2">
              <Checkbox id="a-z" />
              <label className="text-slate-700">Alphabetically, A-Z</label>
            </div>
            <div className="flex space-x-2">
              <Checkbox id="z-a" />
              <label className="text-slate-700">Alphabetically, Z-A</label>
            </div>
            <div className="flex space-x-2">
              <Checkbox id="low-to-high" />
              <label className="text-slate-700">Price, low to high</label>
            </div>
            <div className="flex space-x-2">
              <Checkbox id="high-to-low" />
              <label className="text-slate-700">Price, high to low</label>
            </div>
            <div className="flex space-x-2">
              <Checkbox id="new-to-old" />
              <label className="text-slate-700">Date, new to old</label>
            </div>
            <div className="flex space-x-2">
              <Checkbox id="old-to-new" />
              <label className="text-slate-700">Date, old to new</label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="sizes">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>coming soon</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div>
              <Slider
                className={"mt-2"}
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
              />
              <div className="flex justify-between text-sm mt-3">
                <span>$0</span>
                <span>$100</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="ratings">
          <AccordionTrigger>Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-medium leading-none flex items-center"
                  >
                    {[...Array(rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex space-x-2">
        <Button variant="outline" className="flex items-center justify-center">
          <X className="mr-1" /> Clear
        </Button>
        <Button className="">Apply</Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-4 flex justify-between items-center">
        <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-1" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block w-64 border-r pr-4">
        <FilterContent />
      </div>
    </>
  );
}
