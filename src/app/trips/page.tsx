import EmptyState from "@/components/shared/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripClient from "./TripClient";

const TripsPages = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthroized" subtitle="Please Login" />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips"
      />
    );
  }

  return <TripClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPages;
