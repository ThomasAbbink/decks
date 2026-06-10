export const ResourcesAndEnd = () => {
  return (
    <>
      <h1>Resources</h1>
      <ul>
        <Item text="The Book of Shaders" href="https://thebookofshaders.com/" />
        <Item text="Shadertoy" href="https://www.shadertoy.com/" />
        <Item
          text="Reinder Nijhoff: OneShader"
          href="https://reindernijhoff.net/oneshader/"
        />
        <Item text="Inigo Quilez" href="https://iquilezles.org/" />
        <Item text="My personal website" href="https://pataphysical.tech" />
      </ul>
    </>
  );
};

function Item({ text, href }: { text: string; href: string }) {
  return (
    <li>
      <span className="font-bold"> {text}</span> -{" "}
      <a href={href} target="_blank" rel="noopener noreferrer">
        {href}
      </a>
    </li>
  );
}
