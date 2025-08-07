import { Course } from "@/hooks/useCourses";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

export const CourseCard = ({ course }: { course: Course }) => {
  if (!course || !course.name || !course.image) return null;

  return (
    <View
      style={[styles.card, { backgroundColor: course.bgColor || "#F78B3D" }]}
    >
      <Image
        source={{ uri: course.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.bottomBlock}>
        <Text style={styles.title} numberOfLines={2}>
          {course.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 210,
    borderRadius: 24,
    marginRight: 16,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: 120,
    height: 120,
  },
  bottomBlock: {
    width: "100%",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});
