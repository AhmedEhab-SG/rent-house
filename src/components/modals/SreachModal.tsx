"use client";

import qs from "query-string";
import useSearchModal from "@/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../input/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../shared/Heading";
import Calender from "../input/Calender";
import Counter from "../input/Counter";

enum STEP {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const defaultDate: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEP.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState(defaultDate);

  const Map = useMemo(
    () =>
      dynamic(() => import("../shared/Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEP.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      {
        skipNull: true,
      }
    );

    setStep(STEP.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEP.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondryActionLabel = useMemo(() => {
    if (step === STEP.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wana go"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEP.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you want to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEP.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find you perfect place!" />
        <Counter
          title="Guets"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms  do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Fillters"
      actionLabel={actionLabel}
      secondaryAction={step === STEP.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
