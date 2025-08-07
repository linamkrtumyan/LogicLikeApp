import Entypo from "@expo/vector-icons/Entypo";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export const TagModal = ({
  visible,
  tags,
  selectedTag,
  onClose,
  onSelect,
}: {
  visible: boolean;
  tags: string[];
  selectedTag: string;
  onClose: () => void;
  onSelect: (tag: string) => void;
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      supportedOrientations={["landscape"]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Выбор темы</Text>
        <TouchableOpacity
          onPress={onClose}
          style={{ position: "absolute", top: 40, right: 60 }}
        >
          <Entypo name="cross" size={24} color="#A3B3D0" />
        </TouchableOpacity>
        <View style={styles.list}>
          <TagButton
            label="Все темы"
            selected={selectedTag === ""}
            onPress={() => onSelect("")}
          />
          {tags.map((tag) => (
            <TagButton
              key={tag}
              label={tag}
              selected={selectedTag === tag}
              onPress={() => onSelect(tag)}
            />
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

const TagButton = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.tagButton,
      selected ? styles.tagSelected : styles.tagDefault,
    ]}
  >
    <Text
      style={[
        styles.tagText,
        selected ? styles.selectedText : styles.defaultText,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    color: "#39414B",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  list: {
    width: "70%",
    alignItems: "center",
  },
  tagButton: {
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  tagDefault: {
    backgroundColor: "#fff",
    borderColor: "#C5D0E6",
  },
  tagSelected: {
    backgroundColor: "#5CBB73",
    borderColor: "#5CBB73",
  },
  tagText: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
  },
  defaultText: {
    color: "#39414B",
  },
  selectedText: {
    color: "#fff",
  },
});
