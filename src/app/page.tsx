import getListing, { IListingsParams } from "./actions/getListing";
import getCurrentUser from "./actions/getCurrentUser";
import HomeClient from "./HomeClient";

interface IParams {
  searchParams: IListingsParams;
}

const HomePage = async ({ searchParams }: IParams) => {
  const listingArr = await getListing(searchParams);
  const currentUser = await getCurrentUser();

  return <HomeClient listingArr={listingArr} currentUser={currentUser} />;
};

export default HomePage;
