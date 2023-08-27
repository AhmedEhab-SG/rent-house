"use client";

import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EmptyState";
import ListingCard from "@/components/listing/ListingCard";
import ClientOnly from "@/components/shared/ClientOnly";
import { SafeUser, safeListing } from "@/types";
import useFilter from "@/hooks/useFilter";
import Button from "@/components/shared/Button";

interface HomeClientProps {
  listingArr: safeListing[];
  currentUser?: SafeUser | null;
}

const HomeClient: React.FC<HomeClientProps> = ({ listingArr, currentUser }) => {
  const { value, increment, decrement, isFiltered } = useFilter();
  const listingArrSliced = isFiltered ? listingArr.slice(0, value) : listingArr;

  if (listingArr.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  const listing = listingArrSliced.map((listing) => {
    return (
      <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
    );
  });

  return (
    <ClientOnly>
      <Container>
        <div
          className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5 
        2xl:grid-cols-6
        gap-8"
        >
          {listing}
        </div>
        {isFiltered && value >= listingArr.length && (
          <EmptyState title="Great!" subtitle="You Are All Cought Up." page />
        )}
        {isFiltered && value < listingArr.length && (
          <EmptyState
            title="There is More!"
            subtitle="Continue Exploring Our Homes."
            page
          />
        )}
        <div className="flex flex-col gap-8 justify-start items-center p-10">
          {isFiltered && value < listingArr.length && (
            <Button label="Show More" onClick={increment} homePage />
          )}
          {isFiltered && value >= listingArr.length && (
            <Button label="Show Less" onClick={decrement} homePage outline />
          )}
        </div>
      </Container>
    </ClientOnly>
  );
};
export default HomeClient;
