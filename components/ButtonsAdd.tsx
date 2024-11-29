import { Button, XStack } from "tamagui";
import {
  MessageCircleWarning,
  Calendar,
  PencilLine,
} from "@tamagui/lucide-icons";
import React, { useState } from "react";
import WriteANoteScreen from "./WriteANoteScreen";

type note = {
  title: string;
  note: string;
  id: number;
};

type Props = {
  addNote: (note: note) => void;
};

const ButtonsAdd = ({ addNote }: Props) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const handlePress = () => {
    setPressed(true);
  };

  return (
    <XStack f={1} ai={"flex-end"} jc={"space-between"} mb={15}>
      {pressed == true ? (
        <WriteANoteScreen setPressed={setPressed} addNote={addNote} />
      ) : null}
      <Button
        bg={"#FFE4E6"}
        size={54}
        circular
        icon={MessageCircleWarning}
      ></Button>
      <Button bg={"#D9F7FF"} size={54} circular icon={Calendar}></Button>
      <Button
        bg={"#E4F0FF"}
        size={54}
        circular
        icon={PencilLine}
        onPress={handlePress}
      ></Button>
    </XStack>
  );
};

export default ButtonsAdd;
