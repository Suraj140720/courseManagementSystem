export interface CourseApplication{
    CourseApplicationId? : number;
    UserId : number;
    CourseId : number;
    ApplicationDate : string;
    Status : string;
    Skills : string;
    EducationLevel : string;
    ExperienceDetails : string;
    AdditionalNotes? : string;
}