"use client";

import ListingCard from "@/components/listing/ListingCard";
import Container from "@/components/shared/Container";
import Heading from "@/components/shared/Heading";
import { SafeUser, safeReservation } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

interface TripClientProps {
  reservations: safeReservation[];
  currentUser: SafeUser | null;
}

const TripClient: React.FC<TripClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

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
      disabled={deletingId === reservation.id}
      actionLabel="Cancel reservation"
      currentUser={currentUser}
    />
  ));

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where are you going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation}
      </div>
    </Container>
  );
};

export default TripClient;
