import { type ReactElement } from "react";
import Goals from "./Goals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peace Path - Goals and good habits",
};

export default function Page(): ReactElement {
  return (
    <>
      <Goals />
    </>
  );
}
