import EmptyState from "@/components/shared/EmptyState";
import getFavoriteLising from "../actions/getFavoriteListing";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import ClientOnly from "@/components/shared/ClientOnly";

const favoritesPage = async () => {
  const listings = await getFavoriteLising();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorites Found."
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default favoritesPage;
