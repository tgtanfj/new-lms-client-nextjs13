'use client'

import CourseDetailPage from "@/app/components/course/course-detail-page"

const CourseIdPage = ({params}: {params: any}) => {
  return (
    <div>
      <CourseDetailPage courseId={params.courseId}/>
    </div>
  )
}

export default CourseIdPage