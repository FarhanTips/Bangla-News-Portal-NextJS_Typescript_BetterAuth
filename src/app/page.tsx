import MainNews from "@/components/mainNews";
import MostRead from "@/components/mostRead";
import OtherNews from "@/components/otherNews";



export default function Home() {
  return (
    <div>

      NavBar

      <div className="grid grid-cols-3 w-10/12 mx-auto gap-6">
        {/* news section */}
        <div className="col-span-2">
          <MainNews></MainNews>
          <OtherNews></OtherNews>
        </div >

        {/* most read section */}
        <div className="col-span-1">
          <MostRead></MostRead>
        </div>
        
      </div>
    </div>
  );
}
