import EmptyState from "@/components/shared/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import RreservationsClient from "./RreservationsClient";

const reservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthroized" subtitle="Please Login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations Found."
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <RreservationsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default reservationsPage;
