import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { isGuestServer } from "@/app/lib/server-utils";

// Dummy data for guests
const dummyUsage = {
  document: { size: 1024 * 1024 * 2, latestDate: new Date().toISOString() }, // 2MB
  image: { size: 1024 * 1024 * 5, latestDate: new Date().toISOString() }, // 5MB
  video: { size: 1024 * 1024 * 20, latestDate: new Date().toISOString() }, // 20MB
  audio: { size: 1024 * 1024 * 3, latestDate: new Date().toISOString() }, // 3MB
  other: { size: 1024 * 512, latestDate: new Date().toISOString() }, // 0.5MB
  used: 1024 * 1024 * 30.5, // 30.5MB
  all: 2 * 1024 * 1024 * 1024,
};
const dummyFiles = {
  documents: [
    {
      $id: "1",
      name: "Sample PDF Document.pdf",
      type: "document",
      extension: "pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      $createdAt: new Date().toISOString(),
      owner: { fullName: "Demo User" },
    },
    {
      $id: "2",
      name: "Sample PDF 2.pdf",
      type: "document",
      extension: "pdf",
      url: "https://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf",
      $createdAt: new Date().toISOString(),
      owner: { fullName: "Demo User" },
    },
    {
      $id: "3",
      name: "Unsplash Mountain.jpg",
      type: "image",
      extension: "jpg",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      $createdAt: new Date().toISOString(),
      owner: { fullName: "Demo User" },
    },
    {
      $id: "4",
      name: "Unsplash Forest.jpg",
      type: "image",
      extension: "jpg",
      url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      $createdAt: new Date().toISOString(),
      owner: { fullName: "Demo User" },
    },
    {
      $id: "5",
      name: "Sample Video.mp4",
      type: "video",
      extension: "mp4",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      $createdAt: new Date().toISOString(),
      owner: { fullName: "Demo User" },
    },
    {
      $id: "6",
      name: "Big Buck Bunny.mp4",
      type: "video",
      extension: "mp4",
      url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      $createdAt: new Date().toISOString(),
      owner: { fullName: "Demo User" },
    },
  ],
};

const Dashboard = async () => {
  // Guest mode: show dummy data
  if (await isGuestServer()) {
    const usageSummary = getUsageSummary(dummyUsage);
    return (
      <div className="dashboard-container">
        <section>
          <Chart used={dummyUsage.used} />
          <ul className="dashboard-summary-list">
            {usageSummary.map((summary) => (
              <Link
                href={summary.url}
                key={summary.title}
                className="dashboard-summary-card"
              >
                <div className="space-y-4">
                  <div className="flex justify-between gap-3">
                    <Image
                      src={summary.icon}
                      width={100}
                      height={100}
                      alt="uploaded image"
                      className="summary-type-icon"
                    />
                    <h4 className="summary-type-size">
                      {convertFileSize(summary.size) || 0}
                    </h4>
                  </div>
                  <h5 className="summary-type-title">{summary.title}</h5>
                  <Separator className="bg-light-400" />
                  <FormattedDateTime
                    date={summary.latestDate}
                    className="text-center"
                  />
                </div>
              </Link>
            ))}
          </ul>
        </section>
        <section className="dashboard-recent-files">
          <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
          <ul className="mt-5 flex flex-col gap-5">
            {dummyFiles.documents.map((file) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />
                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  {/* No actions for guests */}
                </div>
              </Link>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  // Parallel requests
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />

        {/* Uploaded file type summaries */}
        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      {/* Recent files uploaded */}
      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
