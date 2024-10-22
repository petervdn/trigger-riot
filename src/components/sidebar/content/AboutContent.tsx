export function AboutContent() {
  return (
    <>
      <h3>About</h3>
      <p>
        This is a recreation of Tiptop Audio&apos;s{" "}
        <a href="https://tiptopaudio.com/trigger-riot/" target="_blank">
          Trigger Riot
        </a>
        , a module for{" "}
        <a href="https://en.wikipedia.org/wiki/Eurorack" target="_blank">
          Eurorack
        </a>{" "}
        systems. The purpose of the module is to generate trigger patterns (i.e.
        rhythms).
      </p>
      <img
        width="100%"
        src="https://tiptopaudio.com/new/wp-content/uploads/2020/06/Tiptop_Audio_Trigger_Riot_white.png"
      />
      <p>
        Owning the module myself, it seemed like an interesting challenge to
        visualize the signals that the module generates.
      </p>
      <h4>Tech used</h4>
      <p>
        Made with NextJS, Zustand, Immer, MaterialUI and Styled Components.
        Source code can be found on{" "}
        <a href="https://github.com/petervdn/trigger-riot" target="_blank">
          GitHub
        </a>
        .
      </p>
    </>
  );
}
