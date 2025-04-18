import { DialogContent } from "./DialogContent";

type Props = {
  onClose: () => void;
};

// TODO: implement
export const ShareDialog = ({ onClose }: Props) => {
  return (
    <div>
      <DialogContent onShared={onClose} onCancel={onClose} />
    </div>
  );
};
