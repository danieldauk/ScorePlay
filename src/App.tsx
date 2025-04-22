import { useState } from "react";
import { ShareDialog } from "~/domains/social-media/use-cases/share";

function App() {
  const [isShareDialogOpen, setShareDialogOpen] = useState(false);
  return (
    <>
      <button onClick={() => setShareDialogOpen(true)}>Open dialog</button>
      <ShareDialog
        open={isShareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
      />
    </>
  );
}

export default App;
