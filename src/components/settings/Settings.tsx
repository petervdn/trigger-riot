"use client";

import { OptionsDial } from "@/src/components/options-dial/OptionsDial";
import { useState } from "react";

export function Settings() {
  const options = ["16th", "8th", "4th", "2nd", "1"];
  const [value, setValue] = useState(options[0]);
  return (
    <div>
      <h2>Settings</h2>
      <OptionsDial
        value={value}
        options={options}
        size={80}
        buttonSize={50}
        onChange={setValue}
      />
    </div>
  );
}
