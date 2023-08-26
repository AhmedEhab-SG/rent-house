import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EmptyState";
import getListing, { IListingsParams } from "./actions/getListing";
import ListingCard from "@/components/listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "@/components/shared/ClientOnly";

interface IParams {
  searchParams: IListingsParams;
}

const HomePage = async ({ searchParams }: IParams) => {
  const listingArr = await getListing(searchParams);
  const currentUser = await getCurrentUser();

  if (listingArr.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  const listing = listingArr.map((listing) => {
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
      </Container>
    </ClientOnly>
  );
};

export default HomePage;
