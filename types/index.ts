export type Video = {
  id: string;
  title: string;
  description?: string | null;
  publicId: string;
  originalSize: string;
  compressedSize: string;
  duration: number;
  createdAt: string | Date;

  compressedReady: boolean;
  compressedPublicId?: string | null;
};
