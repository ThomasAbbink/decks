import infiShoes from "../assets/infi-shoes.png";
import { cn } from "../util/cn";
import { useHandleClick } from "../util/useHandleClick";

const ProductCard = () => {
  const { onClick, isClicked } = useHandleClick();

  return (
    <div className="group not-prose flex w-md flex-col rounded-xl shadow-[0_0_100px_rgba(255,255,255,0.5),30px_30px_50px_rgba(246,121,5,0.2)] select-none">
      <div className="p-4">
        <div className="mb-2 max-h-64 max-w-full overflow-hidden rounded-lg">
          <img
            src={infiShoes}
            alt="Infi Shoes - Product Image"
            className="md aspect-video h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <div className="my-2">
          <div className="flex items-center justify-between">
            <div className="text-foreground text- text-2xl font-bold text-balance">
              Infi schoenen
            </div>
            <div className="bg-accent/15 text-accent border-accent/30 rounded-full border px-4 py-2 text-sm font-bold">
              Exclusief!
            </div>
          </div>
          <div className="text-foreground-secondary text-pretty">
            Voor de echte hardlopers
          </div>
        </div>
        <p className="text-foreground-secondary text-sm leading-relaxed text-pretty">
          Oooh wat een heerlijke hebbedingen! Maar zou je er al lang genoeg
          werken?
        </p>
      </div>
      <div className="bg-background-secondary flex items-center justify-end gap-2 rounded-b-xl p-4">
        <div
          className={cn(
            "text-foreground text-lg leading-tight font-bold transition-[display_opacity] transition-discrete duration-1000 starting:opacity-0",
            isClicked && "block opacity-100",
            !isClicked && "hidden opacity-0",
          )}
        >
          Helaas, jij moet nog iets langer werken :(
        </div>
        <button
          onClick={onClick}
          className="bg-accent text-foreground hover:bg-accent/80 active:bg-accent/60 cursor-pointer rounded-md px-4 py-2 font-bold whitespace-nowrap"
        >
          Nu hebben!
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
