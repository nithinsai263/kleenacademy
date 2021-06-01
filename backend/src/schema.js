const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

let courseSchema = new mongoose.Schema(
  {
    course_name1: String,
    course_name2: String,
    photo: String,
    subtitle: String,
    description: String,
    difficulty: String,
    flashes: String,
    certificate_version: String,
    badges: {
      course_badge: String,
      badge_name: String,
    },
    overview: {
      coursedetailscontent: [
        {
          title1: String,
          title2: String,
          content: [String],
        },
      ],
      sections: [String],
    },
    modules: [
      {
        module_name: String,
        module_video: String,
        module_content: [
          {
            title: String,
            description: [String],
            image: String,
          },
        ],
        module_questions: [
          {
            question: String,
            answer: String,
            flashes: String,
          },
        ],
      },
    ],
  },
  { collection: "courses" }
);

let pathSchema = new mongoose.Schema(
  {
    path_title1: String,
    path_title2: String,
    difficulty: String,
    description: String,
    flashes: String,
    courses: [
      {
        course_id: String,
        course_name: String,
      },
    ],
  },
  { collection: "paths" }
);

let userSchema = new mongoose.Schema({
  name: String,
  profession: String,
  email: String,
  password: String,
  profileimageurl: {
    type: String,
    default: "http://tinypic.com/images/goodbye.jpg",
  },
  googleId: String,
  flashes: {
    type: String,
    default: "30",
  },
  tokenVersion: {
    type: String,
    default: "0",
  },
  badges: [
    {
      course_id: String,
      course_name: String,
      course_badge: String,
      badge_name: String,
    },
  ],
  certificate: [
    {
      path_id: String,
      path_name: String,
      certificate_version: String,
    },
  ],
  courses: {
    inprogress_courses: [
      {
        course_id: String,
        course_name1: String,
        course_name2: String,
        course_completed: Number,
        module: [
          {
            module_id: String,
            module_name: String,
            flag: Number,
            question_flag: Number,
          },
        ],
      },
    ],
  },
  paths: {
    inprogress_paths: [
      {
        path_id: String,
        path_title1: String,
        path_title2: String,
        courses: [
          {
            course_id: String,
            course_name: String,
            flag: Number,
          },
        ],
      },
    ],
  },

  payments: [
    {
      transaction_id: String,
      amount: String,
      time_stamp: String,
      flashes: String,
      discount_coupon: {
        discount_coupon: String,
        discount_percent: String,
      },
    },
  ],
});

let flashesschema = new mongoose.Schema(
  {
    flashes_no: String,
    amount: String,
    discount: [
      {
        discount_coupon: String,
        discount_percent: String,
      },
    ],
  },
  { collection: "flashes" }
);
var Users = mongoose.model("users", userSchema);
var Paths = mongoose.model("paths", pathSchema);
var Courses = mongoose.model("courses", courseSchema);
var Flashes = mongoose.model("flashes", flashesschema);
module.exports = { Courses, Paths, Users, Flashes };
