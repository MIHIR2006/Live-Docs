import Link from "next/link";
import Image from "next/image";
import { dateConverter } from "@/lib/utils";
import { DeleteModal } from "@/components/DeleteModal";

interface DocumentCardProps {
    id: string;
    metadata: {
        title: string;
        [key: string]: any;
    };
    createdAt: string;
    preview: string;
}

const DocumentCard = ({ id, metadata, createdAt, preview }: DocumentCardProps) => {
    return (
        <li className="document-card">
            <Link href={`/documents/${id}`} className="document-card-link">
                {/* Card Header */}
                <div className="document-card-header">
                    <div className="document-card-icon">
                        <Image
                            src="/assets/icons/doc.svg"
                            alt="file"
                            width={28}
                            height={28}
                        />
                    </div>
                    <div className="document-card-meta">
                        <p className="document-card-title">{metadata.title}</p>
                        <p className="document-card-date">
                            {dateConverter(createdAt)}
                        </p>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="document-card-preview">
                    {preview ? (
                        <p className="document-card-preview-text">{preview}</p>
                    ) : (
                        <p className="document-card-preview-empty">Empty document</p>
                    )}
                </div>
            </Link>

            {/* Delete button positioned absolutely */}
            <div className="document-card-actions">
                <DeleteModal roomId={id} />
            </div>
        </li>
    );
};

export default DocumentCard;
