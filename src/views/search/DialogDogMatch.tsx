import React from "react";
import Dialog from "../../components/dialog/Dialog";
import DogCard from "../../components/dog-card/DogCard";
import { Dog } from "../../api/data";
import { useTranslation } from "react-i18next";

interface Props {
  /**
   * The dog to display as the match in the dialog
   */
  dog: Dog | null;
}

/**
 * A dialog that displays the dog the user was matched with
 */
const DialogDogMatch: React.FC<Props> = ({ dog }) => {
  // Initially open once there's a dog, but user can manually close.
  const [isOpen, setIsOpen] = React.useState(!!dog);
  const { t } = useTranslation();
  return (
    <Dialog
      className="dialog-dog-match"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <h2 className="banner">{t("searchMatchDialogBanner")}</h2>
      {dog && <DogCard dog={dog} />}
    </Dialog>
  );
};

export default DialogDogMatch;
