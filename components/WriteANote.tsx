import { View, Text, XStack, Button, YStack, TextArea } from "tamagui";
import { StyleSheet } from "react-native";
import { Save, Trash } from "@tamagui/lucide-icons";
import useWriteANote from "../hooks/useWriteANote";
import Animated from "react-native-reanimated";
import useAnimations from "../hooks/useAnimations";
import { GestureDetector } from "react-native-gesture-handler";

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

  const {
    animatedStyled,
    triggerExitAnimation,

    AnimatedButton,

    tapAdd,
    tapDelete,

    animatedButtonSaveStyle,
    animatedButtonDeleteStyle,
  } = useAnimations();

  return (
    <Animated.View style={[styles.containerShadow, animatedStyled]}>
      <YStack mx={32} mt={36} f={1}>
        <XStack jc={"space-between"}>
          <View jc={"center"}>
            <Text fontSize={27} fontWeight={"$7"} color={"#4F4F4F"}>
              Nota
            </Text>
          </View>

          <XStack gap={19}>
            <GestureDetector gesture={tapAdd}>
              <AnimatedButton
                style={[styles.buttonShadow, animatedButtonSaveStyle]}
                bg={"#DFFFE7"}
                size={42}
                circular
                icon={Save}
                onPress={() => handleSave(triggerExitAnimation)}
              />
            </GestureDetector>
            <GestureDetector gesture={tapDelete}>
              <AnimatedButton
                style={[styles.buttonShadow, animatedButtonDeleteStyle]}
                bg={"#FFC4C4"}
                size={42}
                circular
                icon={Trash}
                onPress={() => handleCancel(triggerExitAnimation)}
              />
            </GestureDetector>
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
    </Animated.View>
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
    flex: 1,
    backgroundColor: "#FFF6E5",
    minHeight: 408,
    width: "100%",
    borderRadius: 20,
    position: "absolute",
    left: 30,
    top: 80,
    zIndex: 1000,
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
