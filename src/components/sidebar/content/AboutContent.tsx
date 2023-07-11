export function AboutContent() {
  return (
    <>
      <h2>About</h2>
      <p>
        This is a recreation of Tiptop Audio's{" "}
        <a href="https://tiptopaudio.com/trigger-riot/" target="_blank">
          Trigger Riot
        </a>
        , a module for{" "}
        <a href="https://en.wikipedia.org/wiki/Eurorack" target="_blank">
          Eurorack
        </a>{" "}
        systems. The main purpose of the module is to generate complex trigger
        patterns.
      </p>
      <img
        width="100%"
        src="https://tiptopaudio.com/new/wp-content/uploads/2020/06/Tiptop_Audio_Trigger_Riot_white.png"
      />
      <p>
        Owning a Trigger Riot myself, it seemed an interesting challenge to
        visualize the signals that the module generates (something the actual
        module doesn't do).
      </p>
      Made with NextJS, Zustand, Immer, MaterialUI and Styled Components. Source
      code can be found on{" "}
      <a href="https://github.com/petervdn/trigger-riot" target="_blank">
        GitHub
      </a>
      .
    </>
  );
}
