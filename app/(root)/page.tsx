import AddDocumentBtn from "@/components/AddDocumentBtn";
import Header from "@/components/Header"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getDocuments, getDocumentPreview } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import { DeleteModal } from "@/components/DeleteModal";
import Notifications from "@/components/Notifications";
import DocumentCard from "@/components/DocumentCard";

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in')

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);

  // Fetch previews for all documents in parallel
  const previews: Record<string, string> = {};
  if (roomDocuments?.data?.length > 0) {
    const previewPromises = roomDocuments.data.map(async (doc: any) => {
      const preview = await getDocumentPreview(doc.id);
      return { id: doc.id, preview };
    });
    const results = await Promise.all(previewPromises);
    results.forEach((result) => {
      previews[result.id] = result.preview;
    });
  }

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-grid">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <DocumentCard
                key={id}
                id={id}
                metadata={metadata}
                createdAt={createdAt}
                preview={previews[id] || ''}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />

          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}

    </main>
  )
}

export default Home