"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/shared/Heading";
import Container from "@/components/shared/Container";
import { SafeUser, safeReservation } from "@/types";
import ListingCard from "@/components/listing/ListingCard";

interface RreservationsClientProps {
  reservations: safeReservation[];
  currentUser?: SafeUser | null;
}

const RreservationsClient: React.FC<RreservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingID, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservations Cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const reservation = reservations.map((reservation) => (
    <ListingCard
      key={reservation.id}
      data={reservation.listing}
      reservation={reservation}
      actionId={reservation.id}
      onAction={onCancel}
      disabled={deletingID === reservation.id}
      actionLabel="Cancel guest reservation"
      currentUser={currentUser}
    />
  ));
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties." />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation}
      </div>
    </Container>
  );
};

export default RreservationsClient;
