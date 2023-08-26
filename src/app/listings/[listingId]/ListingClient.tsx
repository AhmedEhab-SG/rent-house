"use client";

import ListingHead from "@/components/listing/ListingHead";
import ListingInfo from "@/components/listing/ListingInfo";
import ListingReservation from "@/components/listing/ListingReservation";
import { categoriesArr } from "@/components/navbar/Categories";
import Container from "@/components/shared/Container";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeUser, safeListing, safeReservation } from "@/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initalDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: safeReservation[];
  listing: safeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  reservations = [],
  listing,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalprice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initalDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initalDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing.id, loginModal, router, currentUser]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalprice(dayCount * listing.price);
      } else {
        setTotalprice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categoriesArr.find((item) => item.label == listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.bathroomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
            order-first
            mb-10
            md:order-last
            md:col-span-3"
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
