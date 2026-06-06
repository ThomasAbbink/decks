import { Carousel } from "./Carousel";
import { deck } from "./decks/tailwind-4.0";
// import { deck as showAndTellDeck } from "./decks/show-and-tell-2025-09-25";

function App() {
  return <Carousel deck={deck} />;
}

export default App;
