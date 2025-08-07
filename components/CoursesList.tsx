import { Course } from "@/hooks/useCourses";
import { FlatList } from "react-native";
import { CourseCard } from "./CourseCard";

export const CoursesList = ({ courses }: { courses: Course[] }) => {
  return (
    <FlatList
      horizontal
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CourseCard course={item} />}
      showsHorizontalScrollIndicator={false}
    />
  );
};
