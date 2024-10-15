import { useContext, useState } from "react";
import { AuthContext } from "./_app";
import Courses from "../components/courses";
import ScrapeCourseForm from "@/components/scrapecourseform";
import Sidebar from "@/components/sidebar";
import AllCourses from "@/components/allCourses";

export enum Panel {
  MY_COURSES = "My Courses",
  ALL_COURSES = "All Courses",
  CREATE_COURSE = "Create Course",
}

export default function Home() {

  const { accountId, permission } = useContext(AuthContext);
  const [activePanel, setActivePanel] = useState<Panel>(Panel.MY_COURSES);

  if (!accountId) {
    return (
      <div>
        <p>Please Sign up or login</p>
      </div>
    )
  }

  return (
    <div style={{ 'display': 'flex', 'flexDirection': 'row', 'alignItems': 'stretch', 'flexGrow': "1", "height": "100%" }}>
      <Sidebar permission={permission} activePanel={activePanel} setActivePanel={setActivePanel} />
      <div style={{"marginLeft": "20px"}}>
        {activePanel === Panel.MY_COURSES &&
          <div>
            <h1>Courses</h1>
            <Courses accountId={accountId} />
          </div>
        }
        {activePanel === Panel.CREATE_COURSE &&
          <div>
            <h1>Create new Course</h1>
            <ScrapeCourseForm />
          </div>
        }

        {activePanel === Panel.ALL_COURSES &&
          <div>
            <h1>All Courses</h1>
            <AllCourses />
          </div>
        }
      </div>
    </div>
  );
}
