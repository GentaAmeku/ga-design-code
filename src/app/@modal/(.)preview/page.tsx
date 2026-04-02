import { YouTubeEmbed } from "@next/third-parties/google";
import { Suspense } from "react";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getGameDetail } from "@/features/games/actions/getGameDetail";
import PreviewDialogContent from "@/features/games/components/PreviewDialogContent";
import PreviewDialogDescription from "@/features/games/components/PreviewDialogDescription";

type PreviewModalPageProps = {
  searchParams: Promise<{ youtubeId: string }>;
};

type PreviewModalContentProps = {
  searchParams: Promise<{ youtubeId: string }>;
};

const PreviewModalContent = async ({
  searchParams,
}: PreviewModalContentProps) => {
  const { youtubeId } = await searchParams;
  const game = await getGameDetail(youtubeId);
  return (
    <>
      <DialogHeader>
        <DialogTitle>{game.title}</DialogTitle>
      </DialogHeader>
      <YouTubeEmbed videoid={game.youtubeId} />
      <PreviewDialogDescription description={game.description} />
    </>
  );
};

const PreviewModalPage = ({ searchParams }: PreviewModalPageProps) => {
  return (
    <Dialog defaultOpen>
      <PreviewDialogContent>
        <Suspense>
          <PreviewModalContent searchParams={searchParams} />
        </Suspense>
      </PreviewDialogContent>
    </Dialog>
  );
};

export default PreviewModalPage;
