import { MainView } from "@/src/MainView";

export default function SplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="columns-2 flex">
      <div style={{ backgroundColor: "#F6F6F6" }} className="grow p-8">
        <MainView />
      </div>
      <div style={{ backgroundColor: "green" }} className="w-[400px] grow-0">
        <h2>sidebar</h2>
        {children}
      </div>
    </div>
  );
}
