import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge Tailwind + conditionals
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Safe deep clone
export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

// File helpers
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits = 1): string => {
  if (sizeInBytes < 1024) return `${sizeInBytes} Bytes`;
  if (sizeInBytes < 1024 * 1024)
    return `${(sizeInBytes / 1024).toFixed(digits)} KB`;
  if (sizeInBytes < 1024 * 1024 * 1024)
    return `${(sizeInBytes / (1024 * 1024)).toFixed(digits)} MB`;

  return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(digits)} GB`;
};

export const calculatePercentage = (sizeInBytes: number): number => {
  const total = 2 * 1024 * 1024 * 1024; // 2 GB
  return Number(((sizeInBytes / total) * 100).toFixed(2));
};

// Determine file type
export const getFileType = (
  fileName: string
): { type: string; extension: string } => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

// Format ISO string to human-readable time
export const formatDateTime = (isoString?: string | null): string => {
  if (!isoString) return "—";

  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

// Get file icon based on extension or type
export const getFileIcon = (
  extension: string | undefined,
  type: string
): string => {
  const icons: Record<string, string> = {
    pdf: "/assets/icons/file-pdf.svg",
    doc: "/assets/icons/file-doc.svg",
    docx: "/assets/icons/file-docx.svg",
    csv: "/assets/icons/file-csv.svg",
    txt: "/assets/icons/file-txt.svg",
    xls: "/assets/icons/file-document.svg",
    xlsx: "/assets/icons/file-document.svg",
    svg: "/assets/icons/file-image.svg",
    mkv: "/assets/icons/file-video.svg",
    mov: "/assets/icons/file-video.svg",
    avi: "/assets/icons/file-video.svg",
    wmv: "/assets/icons/file-video.svg",
    mp4: "/assets/icons/file-video.svg",
    flv: "/assets/icons/file-video.svg",
    webm: "/assets/icons/file-video.svg",
    m4v: "/assets/icons/file-video.svg",
    "3gp": "/assets/icons/file-video.svg",
    mp3: "/assets/icons/file-audio.svg",
    mpeg: "/assets/icons/file-audio.svg",
    wav: "/assets/icons/file-audio.svg",
    aac: "/assets/icons/file-audio.svg",
    flac: "/assets/icons/file-audio.svg",
    ogg: "/assets/icons/file-audio.svg",
    wma: "/assets/icons/file-audio.svg",
    m4a: "/assets/icons/file-audio.svg",
    aiff: "/assets/icons/file-audio.svg",
    alac: "/assets/icons/file-audio.svg",
  };

  if (extension && icons[extension]) return icons[extension];

  const typeMap: Record<string, string> = {
    image: "/assets/icons/file-image.svg",
    document: "/assets/icons/file-document.svg",
    video: "/assets/icons/file-video.svg",
    audio: "/assets/icons/file-audio.svg",
  };

  return typeMap[type] || "/assets/icons/file-other.svg";
};

// ========== Appwrite URL UTILS ==========
export const constructFileUrl = (bucketFileId: string): string => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const constructDownloadUrl = (bucketFileId: string): string => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

// ========== Dashboard Usage UI Helper ==========
export const getUsageSummary = (totalSpace: Record<string, any>) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: "/assets/icons/file-document-light.svg",
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: "/assets/icons/file-image-light.svg",
      url: "/images",
    },
    {
      title: "Media",
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate:
        totalSpace.video.latestDate > totalSpace.audio.latestDate
          ? totalSpace.video.latestDate
          : totalSpace.audio.latestDate,
      icon: "/assets/icons/file-video-light.svg",
      url: "/media",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: "/assets/icons/file-other-light.svg",
      url: "/others",
    },
  ];
};

// Return matching types based on route param
export const getFileTypesParams = (type: string): string[] => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  }
};
