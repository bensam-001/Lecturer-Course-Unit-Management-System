# Lecturer and Course Unit Management System Documentation

## Overview

The Lecturer and Course Unit Management System is a JavaScript implementation built using the Azle library for efficient data storage and management. This system allows users to perform various operations related to managing lecturers and course units within an educational institution. Users can add, update, retrieve, and delete lecturer and course unit records, as well as perform searches based on various criteria such as name, department, hire date, semester, and year.

## Features

### 1. Lecturer Management

#### 1.1 Get All Lecturers

- **Function:** `getLecturers()`
- **Description:** Retrieve a list of all lecturers.
- **Return Type:** `Result<Vec<Lecturer>, string>`

#### 1.2 Get Lecturer by ID

- **Function:** `getLecturer(id: string)`
- **Description:** Retrieve a specific lecturer by providing its ID.
- **Parameters:**
  - `id` (string): The unique identifier of the lecturer.
- **Return Type:** `Result<Lecturer, string>`

#### 1.3 Add a New Lecturer

- **Function:** `addLecturer(payload: LecturerPayload)`
- **Description:** Add a new lecturer with details specified in the payload.
- **Parameters:**
  - `payload` (LecturerPayload): Object containing lecturer details.
- **Return Type:** `Result<Lecturer, string>`

#### 1.4 Update Existing Lecturer

- **Function:** `updateLecturer(id: string, payload: LecturerPayload)`
- **Description:** Update an existing lecturer by providing its ID and updated details.
- **Parameters:**
  - `id` (string): The unique identifier of the lecturer to be updated.
  - `payload` (LecturerPayload): Object containing updated lecturer details.
- **Return Type:** `Result<Lecturer, string>`

#### 1.5 Delete Lecturer by ID

- **Function:** `deleteLecturer(id: string)`
- **Description:** Delete a specific lecturer by providing its ID.
- **Parameters:**
  - `id` (string): The unique identifier of the lecturer to be deleted.
- **Return Type:** `Result<Lecturer, string>`

#### 1.6 Search Lecturers by Name

- **Function:** `searchLecturersByName(name: string)`
- **Description:** Search for lecturers based on their name or part of their name.
- **Parameters:**
  - `name` (string): The name or part of the name to search for.
- **Return Type:** `Result<Vec<Lecturer>, string>`

#### 1.7 Get Lecturer by Email

- **Function:** `getLecturerByEmail(email: string)`
- **Description:** Retrieve a specific lecturer by providing their email address.
- **Parameters:**
  - `email` (string): The email address of the lecturer.
- **Return Type:** `Result<Lecturer, string>`

#### 1.8 Get Lecturers by Department

- **Function:** `getLecturersByDepartment(department: string)`
- **Description:** Retrieve a list of lecturers belonging to a specific department.
- **Parameters:**
  - `department` (string): The department to filter lecturers by.
- **Return Type:** `Result<Vec<Lecturer>, string>`

#### 1.9 Get Lecturers by Hire Date Range

- **Function:** `getLecturersByHireDateRange(start: string, end: string)`
- **Description:** Retrieve a list of lecturers hired within a specified date range.
- **Parameters:**
  - `start` (string): The start date of the range.
  - `end` (string): The end date of the range.
- **Return Type:** `Result<Vec<Lecturer>, string>`

#### 1.10 Get Lecturers by Hire Year

- **Function:** `getLecturersByHireYear(year: number)`
- **Description:** Retrieve a list of lecturers hired in a specific year.
- **Parameters:**
  - `year` (number): The year to filter lecturers by hire date.
- **Return Type:** `Result<Vec<Lecturer>, string>`

#### 1.11 Get Lecturer Count by Department

- **Function:** `getLecturerCountByDepartment(department: string)`
- **Description:** Count the total number of lecturers in a specific department.
- **Parameters:**
  - `department` (string): The department to count lecturers for.
- **Return Type:** `Result<number, string>`

#### 1.12 Update Lecturer's Department by ID

- **Function:** `updateLecturerDepartment(id: string, department: string)`
- **Description:** Update the department of a specific lecturer by providing their ID.
- **Parameters:**
  - `id` (string): The unique identifier of the lecturer to be updated.
  - `department` (string): The new department for the lecturer.
- **Return Type:** `Result<Lecturer, string>`

#### 1.13 Update Lecturer's Email by ID

- **Function:** `updateLecturerEmail(id: string, email: string)`
- **Description:** Update the email address of a specific lecturer by providing their ID.
- **Parameters:**
  - `id` (string): The unique identifier of the lecturer to be updated.
  - `email` (string): The new email address for the lecturer.
- **Return Type:** `Result<Lecturer, string>`

#### 1.14 Update Lecturer's Name by ID

- **Function:** `updateLecturerName(id: string, name: string)`
- **Description:** Update the name of a specific lecturer by providing their ID.
- **Parameters:**
  - `id` (string): The unique identifier of the lecturer to be updated.
  - `name` (string): The new name for the lecturer.
- **Return Type:** `Result<Lecturer, string>`

#### 1.15 Get Paginated Lecturers

- **Function:** `getLecturersWithPagination(page: number, pageSize: number)`
-

**Description:** Retrieve a paginated list of lecturers.
- **Parameters:**
  - `page` (number): The page number of the pagination.
  - `pageSize` (number): The number of items per page.
- **Return Type:** `Result<Vec<Lecturer>, string>`

#### 1.16 Get Lecturers Sorted by Name

- **Function:** `getLecturersSortedByName()`
- **Description:** Retrieve a sorted list of lecturers by name.
- **Return Type:** `Result<Vec<Lecturer>, string>`

#### 1.17 Get Lecturers by Department and Hire Year

- **Function:** `getLecturersByDepartmentAndHireYear(department: string, year: number)`
- **Description:** Retrieve a list of lecturers based on department and hire year.
- **Parameters:**
  - `department` (string): The department to filter lecturers by.
  - `year` (number): The year to filter lecturers by hire date.
- **Return Type:** `Result<Vec<Lecturer>, string>`

---

### 2. Course Unit Management

#### 2.1 Get All Course Units

- **Function:** `getCourseUnits()`
- **Description:** Retrieve a list of all course units.
- **Return Type:** `Result<Vec<CourseUnit>, string>`

#### 2.2 Get Course Unit by ID

- **Function:** `getCourseUnit(id: string)`
- **Description:** Retrieve a specific course unit by providing its ID.
- **Parameters:**
  - `id` (string): The unique identifier of the course unit.
- **Return Type:** `Result<CourseUnit, string>`

#### 2.3 Add a New Course Unit

- **Function:** `addCourseUnit(payload: CourseUnitPayload)`
- **Description:** Add a new course unit with details specified in the payload.
- **Parameters:**
  - `payload` (CourseUnitPayload): Object containing course unit details.
- **Return Type:** `Result<CourseUnit, string>`

#### 2.4 Update Existing Course Unit

- **Function:** `updateCourseUnit(id: string, payload: CourseUnitPayload)`
- **Description:** Update an existing course unit by providing its ID and updated details.
- **Parameters:**
  - `id` (string): The unique identifier of the course unit to be updated.
  - `payload` (CourseUnitPayload): Object containing updated course unit details.
- **Return Type:** `Result<CourseUnit, string>`

#### 2.5 Delete Course Unit by ID

- **Function:** `deleteCourseUnit(id: string)`
- **Description:** Delete a specific course unit by providing its ID.
- **Parameters:**
  - `id` (string): The unique identifier of the course unit to be deleted.
- **Return Type:** `Result<CourseUnit, string>`

#### 2.6 Get Course Units by Lecturer

- **Function:** `getCourseUnitsByLecturer(lecturerId: string)`
- **Description:** Retrieve a list of course units taught by a specific lecturer.
- **Parameters:**
  - `lecturerId` (string): The ID of the lecturer to filter course units by.
- **Return Type:** `Result<Vec<CourseUnit>, string>`

#### 2.7 Get Course Units by Semester and Year

- **Function:** `getCourseUnitsBySemesterAndYear(semester: string, year: number)`
- **Description:** Retrieve a list of course units based on semester and year.
- **Parameters:**
  - `semester` (string): The semester to filter course units by.
  - `year` (number): The year to filter course units by.
- **Return Type:** `Result<Vec<CourseUnit>, string>`

#### 2.8 Update Course Unit's Lecturer by ID

- **Function:** `updateCourseUnitLecturer(id: string, lecturerId: string)`
- **Description:** Update the lecturer of a specific course unit by providing its ID.
- **Parameters:**
  - `id` (string): The unique identifier of the course unit to be updated.
  - `lecturerId` (string): The ID of the new lecturer.
- **Return Type:** `Result<CourseUnit, string>`

#### 2.9 Update Course Unit's Name by ID

- **Function:** `updateCourseUnitName(id: string, name: string)`
- **Description:** Update the name of a specific course unit by providing its ID.
- **Parameters:**
  - `id` (string): The unique identifier of the course unit to be updated.
  - `name` (string): The new name for the course unit.
- **Return Type:** `Result<CourseUnit, string>`

#### 2.10 Search Course Units by Name

- **Function:** `searchCourseUnitsByName(name: string)`
- **Description:** Search for course units based on their name or part of their name.
- **Parameters:**
  - `name` (string): The name or part of the name to search for.
- **Return Type:** `Result<Vec<CourseUnit>, string>`

#### 2.11 Get Course Units by Semester

- **Function:** `getCourseUnitsBySemester(semester: string)`
- **Description:** Retrieve a list of course units offered in a specific semester.
- **Parameters:**
  - `semester` (string): The semester to filter course units by.
- **Return Type:** `Result<Vec<CourseUnit>, string>`

#### 2.12 Get Course Units by Year

- **Function:** `getCourseUnitsByYear(year: number)`
- **Description:** Retrieve a list of course units offered in a specific year.
- **Parameters:**
  - `year` (number): The year to filter course units by.
- **Return Type:** `Result<Vec<CourseUnit>, string>`

#### 2.13 Get Course Units Sorted by Name

- **Function:** `getCourseUnitsSortedByName()`
- **Description:** Retrieve a sorted list of course units by name.
- **Return Type:** `Result<Vec<CourseUnit>, string>`

#### 2.14 Get Paginated Course Units

- **Function:** `getCourseUnitsWithPagination(page: number, pageSize: number)`
- **Description:** Retrieve a paginated list of course units.
- **Parameters:**
  - `page` (number): The page number of the pagination.


  - `pageSize` (number): The number of items per page.
- **Return Type:** `Result<Vec<CourseUnit>, string>`

---

### 3. Deployment

#### 3.1 Prerequisites

- Node.js installed on the server.

#### 3.2 Steps

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/bensam-001/Lecturer-and-Course-Unit-Management-System.git
   ```
 ```bash
   cd Lecturer-and-Course-Unit-Management-System
   ```
2. Install project dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

4. Deploy the application:

   ```bash
   npm deploy
   ```