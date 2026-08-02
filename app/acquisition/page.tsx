import type { Metadata } from "next";
import { AcquisitionCanvas } from "@/components/AcquisitionCanvas";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

const title = "Acquisition brief";
const description =
  "The Compound Group's public operating canvas: how the consumer-health portfolio works, what transfers, and how a future operator can verify it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/acquisition" },
  openGraph: {
    type: "website",
    url: "https://thecompoundgroup.com/acquisition",
    title: `${title} | The Compound Group`,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function AcquisitionPage() {
  return (
    <>
      <Nav variant="dark" />
      <AcquisitionCanvas />
      <Footer />
    </>
  );
}
