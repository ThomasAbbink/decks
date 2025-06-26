import { Carousel } from "./Carousel";
import { slides } from "./slides";
import { ReviewCode } from "./slides/review-code";

function App() {
  return <Carousel slides={slides} breakoutSlide={ReviewCode} />;
}

export default App;
