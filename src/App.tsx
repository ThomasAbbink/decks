import { Carousel } from "./Carousel";
import * as slides from "./slides";

function App() {
  return (
    <Carousel
      slides={Object.values(slides).map((slide) => ({
        id: slide.name,
        content: slide,
      }))}
    ></Carousel>
  );
}

export default App;
