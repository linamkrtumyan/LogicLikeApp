import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CoursesList } from "@/components/CoursesList";
import { TagModal } from "@/components/TagModal";
import { useCourses } from "@/hooks/useCourses";

export default function HomeScreen() {
  const { courses, tags, loading } = useCourses();
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = courses.filter((course) => {
    if (!selectedTag) return true;
    return course.tags?.includes?.(selectedTag);
  });

  const hasLocked = useRef(false);

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
        hasLocked.current = true;
      } catch (e) {
        console.warn("Orientation lock failed", e);
      }
    };

    const timeout = setTimeout(lockOrientation, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor: "#7446EE",
      }}
    >
      <TouchableOpacity
        style={styles.modalBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.modalBtnText}>{selectedTag || "Все темы"}</Text>
        <View style={styles.iconCircle}>
          <MaterialIcons name="keyboard-arrow-down" size={18} color="#fff" />
        </View>
      </TouchableOpacity>

      {loading ? <Text>Загрузка...</Text> : <CoursesList courses={filtered} />}

      <TagModal
        selectedTag={selectedTag}
        visible={modalVisible}
        tags={tags}
        onClose={() => setModalVisible(false)}
        onSelect={(tag) => {
          setSelectedTag(tag);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  modalBtn: {
    margin: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#5D3FD3",
    borderRadius: 40,
    width: 300,
    marginBottom: 30,
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },

  iconCircle: {
    backgroundColor: "#4A2EB2",
    borderRadius: 999,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
