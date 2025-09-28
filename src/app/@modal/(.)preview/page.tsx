import { YouTubeEmbed } from "@next/third-parties/google";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getGameDetail } from "@/features/games/actions/getGameDetail";
import PreviewDialogContent from "@/features/games/components/PreviewDialogContent";
import PreviewDialogDescription from "@/features/games/components/PreviewDialogDescription";

type PreviewModalPageProps = {
  searchParams: Promise<{ youtubeId: string }>;
};

const PreviewModalPage = async ({ searchParams }: PreviewModalPageProps) => {
  const { youtubeId } = await searchParams;
  const game = await getGameDetail(youtubeId);
  return (
    <Dialog defaultOpen>
      <PreviewDialogContent>
        <DialogHeader>
          <DialogTitle>{game.title}</DialogTitle>
        </DialogHeader>
        <YouTubeEmbed videoid={game.youtubeId} />
        <PreviewDialogDescription description={game.description} />
      </PreviewDialogContent>
    </Dialog>
  );
};

export default PreviewModalPage;
