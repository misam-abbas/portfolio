import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AiAssistant from "@/components/shared/ai-assistant";

export default function StandardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <AiAssistant />
    </>
  );
}
