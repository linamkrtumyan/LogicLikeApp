import { useEffect, useState } from "react";

export interface Course {
  id: number;
  name: string;
  image: string;
  tags: string[];
  bgColor: string;
}
const BASE_URL = "https://logiclike.com/docs";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/courses.json`)
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const tags = Array.from(new Set(courses.flatMap((c) => c.tags))).sort();

  return { courses, tags, loading };
};
