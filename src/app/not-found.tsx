import Link from "next/link";
import Container from "@/src/app/components/Container";

export default function NotFound() {
  return (
    <>
      <main id="content">
        <Container>
          <div className="prose prose-white">
          <h1>Not Found</h1>
          <p>Could not find requested resource</p>
          <Link href="/" className="focus:underline">Return Home</Link>
          </div>
        </Container>
      </main>
    </>
  );
}
