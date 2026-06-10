# Shadery business

## Generative art using fragment shaders

Hi, my name is Thomas. I am a developer at Infi and I am going to talk to you about generative art and shaders. I am going to show code and technical stuff but what this talk is really about encountering paradigm shifts or mind shifts.

### Mind shift 1: generative art

The thing I want you to leave this talk with is how fun it is to encounter a complete paradigm shift. A new way of looking at something that completely changes the way you think about it. The first shift is about _how_ you write code.

I want to impart on you how fun it can be to start writing code without knowing where it should end up. I usually have a topic I want to explore, things I read somewhere. Think voronoi diagrams, flow fields, fractals, fractal brownian motion. Then I just create a folder called `doodle` and see where it ends up.

The same goes for what I write. I make generative art meaning I set up some rules and variables and see where the visuals go. I'm not good at drawing. If I try to make something that exactly resembles lets say a tree it looks horrible. But if I think about how to generate trees, add color and movement, something cool always pops up.

If you take away anything from this talk it should be to find your inner Bob Ross and create some happy little pixels. (Or endpoints or languages or operating systems, mermaid diagrams... whatever floats your boat)

Before I can tell you about the next mindshift I have to tell you what a shader is.

### Preamble - what is a shader?

A shader is a program, a bit of code that runs once for every pixel on your screen. It gets the position it is in and produces a color.

In my examples we are using WebGL which is a Javascript API for running code intended for your GPU in a canvas. The shaders are written in a language called GLSL.

This bit of code is run by your GPU and it will run it in parallel a _bunch_ of times. My macbook has a resolution of 3024 x 1964 for a total of almost 6 million pixels. If I want my shader to run at 60 fps it will be run over 350 million times per second!

A good mental model for a shader is the printing press. You "set the type" until you are done with your page (like compiling your shader) and then you print the whole page at once. It takes some setup and there are some restrictions but it is a lot faster than writing out all books by hand.

Your GPU is capable of running all of these calculations in parallel because it has a _lot_ of tiny microprocessors. These are not as fast as a CPU but they do have fun tricks like hardware acceleration for common operations. These are built into GLSL (eg. `sin()`, `fract()`, `floor()` etc.. ) and you will see them in use in the examples.

So what does that mean in terms of restrictions if you want to write a shader? Every run of your shader needs to be independent of all other runs. You can't check the result of another thread or modify any input data or pass an outcome to another thread. You get a position and return a color, thats it.

### Mind shift 2: I am a pixel

I think we are now ready for the second paradigm shift: I am a pixel. This one is about _how_ you draw. We are going to figure out how the hell to draw shapes when all you know is the current position (spoiler: its math). There is no list of objects and no draw loop you write — you are a single pixel asking "what color am I?".

Writing shaders is hard. It is so far away from the day to day of programming.

Lets dive into some code. I have an example sketch which plays around with a sine wave.

### Sinelines

In my code I called this sketch sinelines once it was done. I created this one in sometime in 2023 after seeing a similar concept somewhere. I used a library called p5js to render to the canvas. No shaders. Its concept is as follows:

- Create a white rectangle that is half the width of the screen wide and 16 pixels high.
- Flip it around, other side of the screen, offset by one "height"
- Alternate until the screen is filled.
- offset the width by a sine of the framecount.

Then there are some more variables going on, changing the offset amount over time but that is it.

### Drawing a rectangle

So how on earth do we begin to think about writing something like this if "you are just one pixel"? Lets look at a bit of code.
There is a lot to unpack here. ...

### Adding movement

It is possible to pass data to a shader program. One of the ways is to pass what is called a uniform. To add movement we need time. In this case we are passing a uniform called u_time. This uniform is incremented from the javascript side. It is important to note that the value will be the same for each pixel.
To modulate the width of the bar we can use the built in sin() function.

### Putting the whole thing together

Thankfully repeating elements is not that hard when writing a shader. You can scale the axis up by the number of repeats, then take the fractional part to determine if the current pixel is inside a bar.
Then there is some logic to alternate the bars.
Finally there is some extra logic going on to give each bar a different offset

### Ok cool. What else can you do?

Procedural noise: You can't have random numbers but you can have noise functions. Given some input these can output smooth organic feeling randomness. There are some well known noise functions, like Perlin and later Simplex noise.

To make the noise feel more organic a technique called Fractional Brownian Motion is often used. You run a loop of "octaves" through a noise function each time increasing the detail and reducing the amplitude. This mimics natural fractal formations.

There are so many topics to dive into.

- using noise to simulate living movement
- Tiling, for instance truchet tiles
- Voronoi diagrams

### Questions

## This is all I have for you today.

There is some time for questions and to distract you and prevent you from asking things that are too difficult I'm going to leave some cool visuals running in a loop.

---

# feedback

highlight fragment shader and vertex shader in pipeline
pipeline -

waarom shaders moeilijk: vergelijken met day to day programmeren

Meer shaders tussendoor -- coole kunst zien.

in de intro waarom -> wat betekend dit onderwerp voor jou?
I AM going to simplify a bit -> shader en dan vertex weg eventueel
Stukjes code en dan verschil van de opbouw blok, movement, verschillende bij elkaar super cool
