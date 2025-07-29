import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getUserSession } from "@/components/auth/auth-data";

const f = createUploadthing();

export const ourFileRouter = {
  // Your existing imageUploader route
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
  })
    .middleware(async ({ req }) => {
      const { user } = await getUserSession();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),

  // ✅ ADD THIS NEW TEST ROUTE
  simpleUploader: f({ image: { maxFileSize: "1MB" } })
    .onUploadComplete(async ({ file }) => {
      // This is the simplest possible success case
      console.log("SIMPLE UPLOADER SUCCESS! File url:", file.ufsUrl);
      return { success: true, url: file.ufsUrl };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;