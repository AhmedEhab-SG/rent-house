import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/components/shared/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const Listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!Listing) {
    return <EmptyState />;
  }

  return (
    <div>
      <ListingClient
        listing={Listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ListingPage;
