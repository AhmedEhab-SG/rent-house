import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SreachModal";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rent-Home",
  description: "Rent-Home NOT REAL WEBSITE OR BRNAD NAME",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="min-h-[90vh] pt-36">{children}</div>
        <hr />
        <Footer />
      </body>
    </html>
  );
}
