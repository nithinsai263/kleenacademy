import { useQuery } from "@apollo/react-hooks";
import React from "react";
import CourseComponent from "./components/CourseComponent";

import { coursecarddetails } from "../graphql/gql";

function Test() {
  const { loading, error, data } = useQuery(coursecarddetails);
  if (loading) return "Loading...";
  if (error) return "error";
  return data.findall.map((item) => {
    <CourseComponent
      title1={item.course_name1}
      title2={item.course_name2}
      courseheading={item.subtitle}
      coursetext={item.description}
      flag={true}
      key={item.course_id}
    />;
  });
}

export default Test;
