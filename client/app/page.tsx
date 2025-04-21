import FileUploader from "@/components/file-uploader";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LandingPage from "@/components/landing";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <LandingPage />
      <Footer />
    </div>
  );
}
