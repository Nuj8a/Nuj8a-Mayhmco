import img_bg from "@/assets/mayhmco.png"
const  Main = () => {
    return (
        <div className=" group relative w-full h-[500px] p-10">
            {/* background image */}
            <div className="absolute inset-0 h-full group-hover:blur-sm transition-[filter] duration-1000 ease-in-out bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${img_bg.src})` }} >
            </div>
            {/* black overlay */}
            <div className="absolute hidden group-hover:block transition-all duration-1000 ease-in-out inset-0 bg-black/50 z-10"></div>
            
            {/* content layer */}
            <div className="flex-col absolute z-20 hidden group-hover:flex transition-all ease-in duration-1000 inset-x-0 bottom-[12%] left-[15%] lg:bottom-[20%]  lg:left-[22%]  gap-4 h-[auto] w-[auto] p-4">
                <pre className="text-slate-50  font-sans text-[30px] tracking-wide font-normal ">
                    {`Mix it with\nyour Smile`}
                </pre>
                <button className="text-black w-fit rounded-xl bg-[#FFDD55] px-4 py-1 text-sm shadow-lg">Shop now</button>
            </div>
        </div>
    )
}

export default Main