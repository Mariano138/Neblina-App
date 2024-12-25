import { View, Text, XStack, Button, YStack, TextArea } from "tamagui";
import { StyleSheet } from "react-native";
import { Save, Trash } from "@tamagui/lucide-icons";
import useWriteANote from "../hooks/useWriteANote";

type Props = {
  addNote: (note: {
    title: string;
    content: string;
    id: string;
    date: string;
    color: string;
  }) => void;
  setWriteNote: React.Dispatch<React.SetStateAction<boolean>>;
};

const WriteANote = ({ addNote, setWriteNote }: Props) => {
  const { handleSave, handleCancel, note, setNote } = useWriteANote({
    addNote,
    setWriteNote,
  });

  return (
    <View
      f={1}
      bg={"#FFF6E5"}
      minHeight={"408"}
      w={"100%"}
      br={20}
      pos={"absolute"}
      left={"30"}
      top={"10%"}
      style={styles.containerShadow}
      zIndex={1000}
    >
      <YStack mx={32} mt={36} f={1}>
        <XStack jc={"space-between"}>
          {/* <Input
            multiline
            maxLength={30}
            backgroundColor="$colorTransparent"
            borderWidth={0}
            placeholder="Título.."
            fontSize={27}
            fontWeight={"bold"}
            h={"auto"}
            w={"60%"}
            color={"#4F4F4F"}
            focusable={false}
            value={"Nota"}
            onChangeText={(text) => setTitle(text)}
          /> */}
          <View jc={"center"}>
            <Text fontSize={27} fontWeight={"$7"} color={"#4F4F4F"}>
              Nota
            </Text>
          </View>

          <XStack gap={19}>
            <Button
              style={styles.buttonShadow}
              bg={"#DFFFE7"}
              size={42}
              circular
              icon={Save}
              onPress={handleSave}
            />

            <Button
              style={styles.buttonShadow}
              bg={"#FFC4C4"}
              size={42}
              circular
              icon={Trash}
              onPress={handleCancel}
            />
          </XStack>
        </XStack>

        <View style={styles.line} />

        <View f={1}>
          <TextArea
            f={1}
            multiline
            fontSize={18}
            verticalAlign={"top"}
            bg={"$colorTransparent"}
            bw={"$0"}
            w={"100%"}
            numberOfLines={8}
            lineHeight={"$5"}
            placeholder="Escribe tu nota aquí..."
            placeholderTextColor="#A8A8A8"
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </View>
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    fontSize: 18,
    width: "100%",
    textAlignVertical: "top",
    lineHeight: 34,
    color: "#4F4F4F",
  },
  containerShadow: {
    boxShadow:
      "10px 15px 4px rgba(0, 0, 0, 0.3), inset 5px 10px 4px rgba(0, 0, 0, 0.2)",
  },
  buttonShadow: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.4)",
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: "#D1D1D1",
    marginVertical: 10,
  },
});

export default WriteANote;
