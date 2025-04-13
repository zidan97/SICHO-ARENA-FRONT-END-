import HomeContent from "../Content/HomeContent";
import ReserveSlot from "../Content/ReserveSlot";
import SportsCategory from "../Content/SportsCategory";
import YoutubeEmbaded from "../Content/YoutubeEmbaded";
import TopMenu from "../layout/TopMenu";

export default function HomePage() {
  return (
    <div>
      {/* <TopMenu></TopMenu> */}
      <HomeContent></HomeContent>
      <SportsCategory></SportsCategory>
      <YoutubeEmbaded></YoutubeEmbaded>
      <ReserveSlot></ReserveSlot>
      </div>
  );
}
