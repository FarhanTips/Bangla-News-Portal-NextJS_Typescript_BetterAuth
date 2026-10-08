import MainNews from "@/components/mainNews";



export default function Home() {
  return (
    <div>

      NavBar

      <div className="grid grid-cols-3 w-10/12 mx-auto">
        {/* news section */}
        <div className="col-span-2">
          <MainNews></MainNews>
        </div >

        {/* most read section */}
        <div className="col-span-1 bg-green-500 p-10">

        </div>
      </div>
    </div>
  );
}
