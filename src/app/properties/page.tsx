import EmptyState from "@/components/shared/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListing from "../actions/getListing";

const propertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthroized" subtitle="Please Login" />;
  }

  const listings = await getListing({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subtitle="Looks like you havent Properties!"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default propertiesPage;
