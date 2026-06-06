import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";
import { decks, getDeck, getDeckId } from "./decks/registry";

function App() {
  const [deckId, setDeckId] = useState(getDeckId);

  useEffect(() => {
    const onHashChange = () => setDeckId(getDeckId());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const deck = getDeck(deckId);

  if (!deck) {
    return (
      <div className="bg-background text-foreground flex h-screen flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">Presentations</h1>
        <ul className="flex flex-col gap-2 text-xl">
          {decks.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#/${entry.id}`}
                className="text-accent underline underline-offset-4"
              >
                {entry.deck.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <Carousel key={deckId} deck={deck} />;
}

export default App;
