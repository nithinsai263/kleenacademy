import { gql } from "@apollo/client";

const finduser = gql`
  query {
    finduser {
      id
      name
      email
      tokenVersion
      profession
      flashes
      profileimageurl
      badges {
        course_id
        course_name
        badge_name
        course_badge
      }
      certificate {
        path_id
        path_name
        certificate_version
      }
    }
  }
`;
const findallPayments = gql`
  query {
    finduser {
      email
      payments {
        transaction_id
        time_stamp
        amount
        flashes
        discount_coupon {
          discount_coupon
          discount_percent
        }
      }
    }
  }
`;
const findall = gql`
  query {
    findall {
      id
      course_name1
      course_name2
      description
      difficulty
      subtitle
      flashes
      modules {
        id
        module_name
      }
    }
  }
`;
const findallpaths = gql`
  query {
    findallpaths {
      id
      path_title1
      path_title2
      difficulty
      description
      flashes
      courses {
        course_id
      }
    }
  }
`;

const findallflashes = gql`
  query {
    findallflashes {
      id
      flashes_no
      amount
      discount {
        discount_coupon
        discount_percent
      }
    }
  }
`;
const addflash = gql`
  mutation (
    $flashes_no: String!
    $amount: String!
    $discount: [adddiscountstructure]!
  ) {
    addflash(flashes_no: $flashes_no, amount: $amount, discount: $discount)
  }
`;

const deleteflash = gql`
  mutation ($id: String!) {
    deleteflash(id: $id)
  }
`;

const addpath = gql`
  mutation (
    $path_title1: String!
    $path_title2: String!
    $difficulty: String!
    $description: String!
    $flashes: String!
    $courses: [addpathcoursesstructure]!
  ) {
    addpath(
      path_title1: $path_title1
      path_title2: $path_title2
      difficulty: $difficulty
      description: $description
      flashes: $flashes
      courses: $courses
    )
  }
`;

const addcourse = gql`
  mutation (
    $course_name1: String!
    $course_name2: String!
    $subtitle: String!
    $photo: String!
    $description: String!
    $difficulty: String!
    $flashes: String!
    $overview: addoverview
    $modules: [addmodules]
  ) {
    addcourse(
      course_name1: $course_name1
      course_name2: $course_name2
      subtitle: $subtitle
      photo: $photo
      description: $description
      difficulty: $difficulty
      flashes: $flashes
      overview: $overview
      modules: $modules
    )
  }
`;

const editcoursedetails = gql`
  mutation (
    $id: String!
    $course_name1: String!
    $course_name2: String!
    $subtitle: String!
    $description: String!
    $difficulty: String!
    $flashes: String!
  ) {
    updatecoursedetails(
      id: $id
      course_name1: $course_name1
      course_name2: $course_name2
      subtitle: $subtitle
      description: $description
      difficulty: $difficulty
      flashes: $flashes
    )
  }
`;

const editpathdetails = gql`
  mutation (
    $id: String!
    $path_title1: String!
    $path_title2: String!
    $description: String!
    $difficulty: String!
    $flashes: String!
  ) {
    updatepathdetails(
      id: $id
      path_title1: $path_title1
      path_title2: $path_title2
      description: $description
      difficulty: $difficulty
      flashes: $flashes
    )
  }
`;

export {
  finduser,
  findallPayments,
  findall,
  findallpaths,
  findallflashes,
  addflash,
  addpath,
  addcourse,
  deleteflash,
  editcoursedetails,
  editpathdetails,
};
