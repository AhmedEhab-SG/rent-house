"use client";

import ListingCard from "@/components/listing/ListingCard";
import Container from "@/components/shared/Container";
import Heading from "@/components/shared/Heading";
import { SafeUser, safeListing } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

interface PropertiesClientProps {
  listings: safeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          toast.success("Propertie Deleted");
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

  const listing = listings.map((listing) => (
    <ListingCard
      key={listing.id}
      data={listing}
      actionId={listing.id}
      onAction={onCancel}
      disabled={deletingId === listing.id}
      actionLabel="Delete properties"
      currentUser={currentUser}
    />
  ));

  return (
    <Container>
      <Heading title="Properties" subtitle="List of you properties." />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing}
      </div>
    </Container>
  );
};

export default PropertiesClient;
