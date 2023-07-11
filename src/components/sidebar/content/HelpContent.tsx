export function HelpContent() {
  return (
    <>
      <h3>Help</h3>

      <ul>
        <li>
          The Trigger Riot consists of 16 pulse wave generators, layed out in a
          4x4 matrix.
        </li>
        <li>
          Each generator has multiple properties, the menu above the matrix
          defines which property is currently being edited.
        </li>
        <li>
          These pulse waves are NOT meant to be heard (even though you could)
          but are used as trigger signals, where a trigger is the signal
          changing from low to high.
        </li>
        <li>
          The 16 generators are grouped together in 4 rows and 4 columns (each
          containing 4 generators).
        </li>
        <li>
          Each of these groups combines the containing signals into one signal
          for the group. This is done by a logical OR operation: when one (or
          more) of the signals in the group is high, then the combined signal is
          high.
        </li>
        <li>
          A group can be assigned a sound, and the combined wave for that group
          is used to trigger it (so when that signal changes from low to high).
        </li>
        <li>
          Each group has a (small) display for its signal, clicking that will
          select the group and show the signal in the large display on top of
          the page.
        </li>
      </ul>
    </>
  );
}
