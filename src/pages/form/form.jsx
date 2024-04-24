import LeftSidebar from "../../components/LeftSidebar";
import MainComponent from "../../components/MainComponent";
export default function Example() {
  return (
    <div className="flex">
    <LeftSidebar />
    <div className="flex-1 flex justify-center items-center pt-36">
      <MainComponent />
    </div>
  </div>
  );
}
