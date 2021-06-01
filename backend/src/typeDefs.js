const { gql } = require("apollo-server-express");
//strumod

const typeDefs = gql`
  type Query {
    findall: [structure]
    findcourse(course_id: String): structure
    findallpaths: [pathstructure]
    findpath(course_id: String): pathstructure
    findpathid(id: ID): pathstructure
    finduser: [userstructure]
    userdata(id: ID): userstructure
    me: ID
    findallflashes: [flashesstructure]
  }
  scalar JSON
  type Mutation {
    logout: Boolean!
    addcourse(
      course_name1: String!
      course_name2: String!
      subtitle: String!
      photo: String!
      description: String!
      difficulty: String!
      flashes: String!
      overview: addoverview
      modules: [addmodules]
    ): Boolean!
    addpath(
      path_title1: String!
      path_title2: String!
      difficulty: String!
      description: String!
      flashes: String!
      courses: [addpathcoursesstructure]!
    ): Boolean!
    updatepathdetails(
      id: String!
      path_title1: String!
      path_title2: String!
      description: String!
      flashes: String!
      difficulty: String!
    ): Boolean!
    addflash(
      flashes_no: String!
      amount: String!
      discount: [adddiscountstructure]
    ): Boolean!
    deleteflash(id: String!): Boolean!
    updatecoursedetails(
      id: String!
      course_name1: String!
      course_name2: String!
      description: String!
      subtitle: String!
      flashes: String!
      difficulty: String!
    ): Boolean!
    signS3(filename: String!, filetype: String!): S3Payload!
    savepictureurl(profilepictureurl: String!, id: String!): Boolean!
    modulequestion(
      id: ID
      flashes: String
      courseid: String
      moduleid: String
    ): Boolean
    createUser(
      email: String!
      password: String!
      name: String!
      username: String!
    ): Boolean!
    googlelogin(email: String!, name: String!, googleId: String!): LoginResponse
    googlesignup(
      email: String!
      name: String!
      googleId: String!
    ): LoginResponse
    login(email: String!, password: String!): LoginResponse

    addinprogresscourseuser(
      id: ID
      course_id: String
      course_name1: String
      course_name2: String
      module: [usercoursemoduleinput]
      flashes: String
    ): Boolean
    addcompletedcourseuser(id: ID, course_id: String): Boolean
    addinprogresspathuser(
      id: ID
      path_id: String
      path_title1: String
      path_title2: String
      courses: [userpathcourseinput]
      flashes: String
    ): Boolean
    addcompletedpathuser(id: ID): Boolean
    changeuserprofileinfo(id: ID, name: String, profession: String): Boolean
    changeuseraccountinfo(id: ID): Boolean
    usercoursemoduleupdate(
      id: ID
      module: [usercoursemoduleinput]
      course_id: String
    ): Boolean
  }
  type LoginResponse {
    accessToken: String!
    userId: ID!
    flag: Boolean!
  }

  type userstructure {
    id: ID
    tokenVersion: String
    badges: [badgestructure]
    certificate: [certificatestructure]
    payments: [paymentstructure]
    name: String
    profession: String
    profileimageurl: String
    email: String
    flashes: String
    courses: usercourses
    paths: userpaths
  }

  type userpaths {
    inprogress_paths: [userinprogresspaths]
    completed_paths: [usercompletedpaths]
  }

  type usercompletedpaths {
    path_id: String
    path_title1: String
    path_title2: String
    courses: [userpathcourses]
    certificate: String
  }

  type userinprogresspaths {
    path_id: String
    path_title1: String
    path_title2: String
    courses: [userpathcourses]
  }

  type userpathcourses {
    course_id: String
    course_name1: String
    flag: Int
  }

  type usercourses {
    inprogress_courses: [userinprogresscourses]
    completed_courses: [usercompletedcourses]
  }

  type usercompletedcourses {
    course_id: String
    course_name1: String
    course_name2: String
    module: [usercoursemodule]
    review: usercoursereview
  }

  type usercoursereview {
    stars: Int
    feedback: String
  }

  type userinprogresscourses {
    course_id: String
    course_name1: String
    course_name2: String
    course_completed: Int
    module: [usercoursemodule]
  }

  type usercoursemodule {
    module_id: String
    module_name: String
    flag: Int
    question_flag: Int
  }
  type badgestructure {
    course_id: String
    course_name: String
    badge_name: String
    course_badge: String
  }
  type certificatestructure {
    path_id: String
    path_name: String
    certificate_version: String
  }
  type paymentstructure {
    transaction_id: String
    amount: String
    time_stamp: String
    flashes: String
    discount_coupon: discountstructure
  }

  input userpathcourseinput {
    course_id: String
    course_name1: String
    flag: Int
  }

  input usercoursemoduleinput {
    module_id: String
    module_name: String
    flag: Int
    question_flag: Int
  }

  type pathstructure {
    id: ID
    path_title1: String
    path_title2: String
    difficulty: String
    description: String
    flashes: String
    courses: [pathcourses]
  }

  type pathcourses {
    course_id: String
    course_name: String
  }

  type structure {
    id: String
    course_name1: String
    course_name2: String
    photo: String
    subtitle: String
    description: String
    difficulty: String
    flashes: String
    overview: strucoverview
    modules: [strumod]
  }

  type strumod {
    id: ID
    module_name: String
    module_video: String
    module_content: [strumodcont]
    module_questions: [strumodques]
  }

  type strumodcont {
    title: String
    description: [String]
    image: String
  }

  type strumodques {
    question: String
    answer: String
    flashes: String
  }

  type strucoverview {
    sections: [String]
    coursedetailscontent: [strudetails]
  }

  type strudetails {
    title1: String
    title2: String
    content: [String]
  }
  type flashesstructure {
    id: String
    flashes_no: String
    amount: String
    discount: [discountstructure]
  }
  type discountstructure {
    discount_coupon: String
    discount_percent: String
  }
  type S3Payload {
    signedRequest: String!
    url: String!
  }
  input adddiscountstructure {
    discount_coupon: String
    discount_percent: String
  }
  input addpathcoursesstructure {
    course_id: String
    course_name: String
  }
  input addoverview {
    sections: [String]
    coursedetailscontent: [addstrudetails]
  }
  input addstrudetails {
    title1: String
    title2: String
    content: [String]
  }
  input addmodules {
    id: ID
    module_name: String
    module_video: String
    module_content: [addstrumodcont]
    module_questions: [addstrumodques]
  }

  input addstrumodcont {
    title: String
    description: [String]
    image: String
  }

  input addstrumodques {
    question: String
    answer: String
    flashes: String
  }
`;
module.exports = { typeDefs };
