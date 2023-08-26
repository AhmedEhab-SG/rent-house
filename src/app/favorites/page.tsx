import EmptyState from "@/components/shared/EmptyState";
import getFavoriteLising from "../actions/getFavoriteListing";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";

const favoritesPage = async () => {
  const listings = await getFavoriteLising();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Favorites Found."
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default favoritesPage;
