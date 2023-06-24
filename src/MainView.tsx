"use client";

import { Dial } from "@/src/components/dial/Dial";
import { useState } from "react";
import { DialCircle } from "@/src/components/dial/DialCircle";

export function MainView() {
  const [value1, setValue1] = useState(150);
  const [value2, setValue2] = useState(15);
  return (
    <div className="flex  space-x-2">
      <Dial
        min={100}
        max={200}
        value={value1}
        size={100}
        onChange={setValue1}
        buttonSize={70}
      />
      <Dial
        min={10}
        max={20}
        value={value2}
        size={100}
        onChange={setValue2}
        buttonSize={70}
        integer={true}
      />
    </div>
  );
}
