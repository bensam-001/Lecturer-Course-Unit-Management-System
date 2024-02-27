import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define types for Lecturer and LecturerPayload
type Lecturer = Record<{
    id: string;
    name: string;
    email: string;
    hireDate: string;
    department: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type LecturerPayload = Record<{
    name: string;
    email: string;
    hireDate: string;
    department: string;
}>

// Define types for CourseUnit and CourseUnitPayload
type CourseUnit = Record<{
    id: string;
    name: string;
    lecturerId: string;
    semester: string;
    year: number;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type CourseUnitPayload = Record<{
    name: string;
    lecturerId: string;
    semester: string;
    year: number;
}>

// Create a map to store lecturer records
const lecturerStorage = new StableBTreeMap<string, Lecturer>(0, 44, 1024);
// Create a map to store course unit records
const courseUnitStorage = new StableBTreeMap<string, CourseUnit>(1, 44, 1024);

/**
 * Retrieves all lecturers.
 * @returns A Result containing a list of lecturers if successful, or an error message if failed.
 */
$query;
export function getLecturers(): Result<Vec<Lecturer>, string> {
    return Result.Ok(lecturerStorage.values());
}

/**
 * Retrieves a lecturer by ID.
 * @param id The ID of the lecturer to retrieve.
 * @returns A Result containing the lecturer if found, or an error message if not found or an error occurred.
 */
$query;
export function getLecturer(id: string): Result<Lecturer, string> {
    return match(lecturerStorage.get(id), {
        Some: (lecturer) => Result.Ok<Lecturer, string>(lecturer),
        None: () => Result.Err<Lecturer, string>(`Lecturer with id=${id} not found`)
    });
}

/**
 * Adds a new lecturer.
 * @param payload The data for the new lecturer.
 * @returns A Result containing the newly added lecturer if successful, or an error message if failed.
 */
$update;
export function addLecturer(payload: LecturerPayload): Result<Lecturer, string> {
    // Input validation
    if (!payload || !payload.name || !payload.email || !payload.hireDate || !payload.department) {
        return Result.Err("Invalid lecturer payload. All fields are required.");
    }

    const lecturer: Lecturer = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    lecturerStorage.insert(lecturer.id, lecturer);
    return Result.Ok(lecturer);
}


/**
 * Updates a lecturer by ID.
 * @param id The ID of the lecturer to update.
 * @param payload The data to update the lecturer with.
 * @returns A Result containing the updated lecturer if successful, or an error message if failed.
 */
$update;
export function updateLecturer(id: string, payload: LecturerPayload): Result<Lecturer, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid lecturer ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(lecturerStorage.get(id), {
        Some: (lecturer) => {
            const updatedLecturer: Lecturer = {...lecturer, ...payload, updatedAt: Opt.Some(ic.time())};
            lecturerStorage.insert(lecturer.id, updatedLecturer);
            return Result.Ok<Lecturer, string>(updatedLecturer);
        },
        None: () => Result.Err<Lecturer, string>(`Couldn't update a lecturer with id=${id}. Lecturer not found`)
    });
}

/**
 * Deletes a lecturer by ID.
 * @param id The ID of the lecturer to delete.
 * @returns A Result containing the deleted lecturer if successful, or an error message if failed.
 */
$update;
export function deleteLecturer(id: string): Result<Lecturer, string> {
    return match(lecturerStorage.remove(id), {
        Some: (deletedLecturer) => Result.Ok<Lecturer, string>(deletedLecturer),
        None: () => Result.Err<Lecturer, string>(`Couldn't delete a lecturer with id=${id}. Lecturer not found.`)
    });
}

/**
 * Retrieves lecturers by department.
 * @param department The department to filter lecturers by.
 * @returns A Result containing a list of lecturers if successful, or an error message if failed.
 */
$query;
export function getLecturersByDepartment(department: string): Result<Vec<Lecturer>, string> {
    const lecturersByDepartment = lecturerStorage
        .values()
        .filter(lecturer => lecturer.department === department);
    return Result.Ok(lecturersByDepartment);
}

/**
 * Retrieves lecturers by hire date range.
 * @param start The start date of the range.
 * @param end The end date of the range.
 * @returns A Result containing a list of lecturers if successful, or an error message if failed.
 */
$query;
export function getLecturersByHireDateRange(start: string, end: string): Result<Vec<Lecturer>, string> {
    const lecturersByDateRange = lecturerStorage
        .values()
        .filter(lecturer => lecturer.hireDate >= start && lecturer.hireDate <= end);
    return Result.Ok(lecturersByDateRange);
}

/**
 * Updates a lecturer's department by ID.
 * @param id The ID of the lecturer to update.
 * @param department The new department for the lecturer.
 * @returns A Result containing the updated lecturer if successful, or an error message if failed.
 */
$update;
export function updateLecturerDepartment(id: string, department: string): Result<Lecturer, string> {
    return match(lecturerStorage.get(id), {
        Some: (lecturer) => {
            const updatedLecturer: Lecturer = { ...lecturer, department, updatedAt: Opt.Some(ic.time()) };
            lecturerStorage.insert(lecturer.id, updatedLecturer);
            return Result.Ok<Lecturer, string>(updatedLecturer);
        },
        None: () => Result.Err<Lecturer, string>(`Couldn't update the department for lecturer with id=${id}. Lecturer not found`)
    });
}

/**
 * Updates a lecturer's email by ID.
 * @param id The ID of the lecturer to update.
 * @param email The new email for the lecturer.
 * @returns A Result containing the updated lecturer if successful, or an error message if failed.
 */
$update;
export function updateLecturerEmail(id: string, email: string): Result<Lecturer, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid lecturer ID.");
    }
    if (!email) {
        return Result.Err("Invalid email. Email field is required.");
    }

    return match(lecturerStorage.get(id), {
        Some: (lecturer) => {
            const updatedLecturer: Lecturer = { ...lecturer, email, updatedAt: Opt.Some(ic.time()) };
            lecturerStorage.insert(lecturer.id, updatedLecturer);
            return Result.Ok<Lecturer, string>(updatedLecturer);
        },
        None: () => Result.Err<Lecturer, string>(`Couldn't update the email for lecturer with id=${id}. Lecturer not found`)
    });
}

/**
 * Retrieves lecturers by name.
 * @param name The name or part of the name to search for.
 * @returns A Result containing a list of matching lecturers if successful, or an error message if failed.
 */
$query;
export function searchLecturersByName(name: string): Result<Vec<Lecturer>, string> {
    const matchingLecturers = lecturerStorage
        .values()
        .filter(lecturer => lecturer.name.toLowerCase().includes(name.toLowerCase()));
    return Result.Ok(matchingLecturers);
}


/**
 * Retrieves a lecturer by email.
 * @param email The email of the lecturer to retrieve.
 * @returns A Result containing the lecturer if found, or an error message if not found.
 */
$query;
export function getLecturerByEmail(email: string): Result<Lecturer, string> {
    const lecturer = lecturerStorage
        .values()
        .find(lecturer => lecturer.email === email);

    if (lecturer) {
        return Result.Ok(lecturer);
    } else {
        return Result.Err(`Lecturer with email ${email} not found`);
    }
}

/**
 * Retrieves lecturers hired in a specific year.
 * @param year The year to filter lecturers by hire date.
 * @returns A Result containing a list of lecturers hired in the specified year if successful, or an error message if failed.
 */
$query;
export function getLecturersByHireYear(year: number): Result<Vec<Lecturer>, string> {
    const lecturersByYear = lecturerStorage
        .values()
        .filter(lecturer => new Date(lecturer.hireDate).getFullYear() === year);
    return Result.Ok(lecturersByYear);
}

/**
 * Retrieves the count of lecturers in a specific department.
 * @param department The department to count lecturers for.
 * @returns A Result containing the count of lecturers in the specified department if successful, or an error message if failed.
 */
$query;
export function getLecturerCountByDepartment(department: string): Result<number, string> {
    const lecturersByDepartment = lecturerStorage
        .values()
        .filter(lecturer => lecturer.department === department);
    return Result.Ok(lecturersByDepartment.length);
}

/**
 * Updates a lecturer's name by ID.
 * @param id The ID of the lecturer to update.
 * @param name The new name for the lecturer.
 * @returns A Result containing the updated lecturer if successful, or an error message if failed.
 */
$update;
export function updateLecturerName(id: string, name: string): Result<Lecturer, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid lecturer ID.");
    }
    if (!name) {
        return Result.Err("Invalid name. Name field is required.");
    }

    return match(lecturerStorage.get(id), {
        Some: (lecturer) => {
            const updatedLecturer: Lecturer = { ...lecturer, name, updatedAt: Opt.Some(ic.time()) };
            lecturerStorage.insert(lecturer.id, updatedLecturer);
            return Result.Ok<Lecturer, string>(updatedLecturer);
        },
        None: () => Result.Err<Lecturer, string>(`Couldn't update the name for lecturer with id=${id}. Lecturer not found`)
    });
}

/**
 * Retrieves a paginated list of lecturers.
 * @param page The page number of the pagination.
 * @param pageSize The size of each page.
 * @returns A Result containing a paginated list of lecturers if successful, or an error message if failed.
 */
$query;
export function getLecturersWithPagination(page: number, pageSize: number): Result<Vec<Lecturer>, string> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedLecturers = lecturerStorage.values().slice(startIndex, endIndex);
    return Result.Ok(paginatedLecturers);
}

/**
 * Retrieves a sorted list of lecturers by name.
 * @returns A Result containing a sorted list of lecturers by name if successful, or an error message if failed.
 */
$query;
export function getLecturersSortedByName(): Result<Vec<Lecturer>, string> {
    const sortedLecturers = lecturerStorage.values().sort((a, b) => a.name.localeCompare(b.name));
    return Result.Ok(sortedLecturers);
}

/**
 * Retrieves lecturers by department and hire year.
 * @param department The department to filter lecturers by.
 * @param year The year to filter lecturers by hire date.
 * @returns A Result containing a list of lecturers if successful, or an error message if failed.
 */
$query;
export function getLecturersByDepartmentAndHireYear(department: string, year: number): Result<Vec<Lecturer>, string> {
    const filteredLecturers = lecturerStorage.values().filter(lecturer => lecturer.department === department && new Date(lecturer.hireDate).getFullYear() === year);
    return Result.Ok(filteredLecturers);
}

/**
 * Retrieves all course units.
 * @returns A Result containing a list of course units if successful, or an error message if failed.
 */
$query;
export function getCourseUnits(): Result<Vec<CourseUnit>, string> {
    return Result.Ok(courseUnitStorage.values());
}

/**
 * Retrieves a course unit by ID.
 * @param id The ID of the course unit to retrieve.
 * @returns A Result containing the course unit if found, or an error message if not found.
 */
$query;
export function getCourseUnit(id: string): Result<CourseUnit, string> {
    return match(courseUnitStorage.get(id), {
        Some: (courseUnit) => Result.Ok<CourseUnit, string>(courseUnit),
        None: () => Result.Err<CourseUnit, string>(`Course unit with id=${id} not found`)
    });
}

/**
 * Adds a new course unit.
 * @param payload The data for the new course unit.
 * @returns A Result containing the newly added course unit if successful, or an error message if failed.
 */
$update;
export function addCourseUnit(payload: CourseUnitPayload): Result<CourseUnit, string> {
    // Input validation
    if (!payload || !payload.name || !payload.lecturerId || !payload.semester || !payload.year) {
        return Result.Err("Invalid course unit payload. All fields are required.");
    }

    const courseUnit: CourseUnit = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    courseUnitStorage.insert(courseUnit.id, courseUnit);
    return Result.Ok(courseUnit);
}

/**
 * Updates a course unit by ID.
 * @param id The ID of the course unit to update.
 * @param payload The data to update the course unit with.
 * @returns A Result containing the updated course unit if successful, or an error message if failed.
 */
$update;
export function updateCourseUnit(id: string, payload: CourseUnitPayload): Result<CourseUnit, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid course unit ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(courseUnitStorage.get(id), {
        Some: (courseUnit) => {
            const updatedCourseUnit: CourseUnit = {...courseUnit, ...payload, updatedAt: Opt.Some(ic.time())};
            courseUnitStorage.insert(courseUnit.id, updatedCourseUnit);
            return Result.Ok<CourseUnit, string>(updatedCourseUnit);
        },
        None: () => Result.Err<CourseUnit, string>(`Couldn't update a course unit with id=${id}. Course unit not found`)
    });
}

/**
 * Deletes a course unit by ID.
 * @param id The ID of the course unit to delete.
 * @returns A Result containing the deleted course unit if successful, or an error message if failed.
 */
$update;
export function deleteCourseUnit(id: string): Result<CourseUnit, string> {
    return match(courseUnitStorage.remove(id), {
        Some: (deletedCourseUnit) => Result.Ok<CourseUnit, string>(deletedCourseUnit),
        None: () => Result.Err<CourseUnit, string>(`Couldn't delete a course unit with id=${id}. Course unit not found.`)
    });
}

/**
 * Retrieves course units by lecturer.
 * @param lecturerId The ID of the lecturer to filter course units by.
 * @returns A Result containing a list of course units if successful, or an error message if failed.
 */
$query;
export function getCourseUnitsByLecturer(lecturerId: string): Result<Vec<CourseUnit>, string> {
    const courseUnitsByLecturer = courseUnitStorage
        .values()
        .filter(courseUnit => courseUnit.lecturerId === lecturerId);
    return Result.Ok(courseUnitsByLecturer);
}

/**
 * Retrieves course units by semester and year.
 * @param semester The semester to filter course units by.
 * @param year The year to filter course units by.
 * @returns A Result containing a list of course units if successful, or an error message if failed.
 */
$query;
export function getCourseUnitsBySemesterAndYear(semester: string, year: number): Result<Vec<CourseUnit>, string> {
    const courseUnitsBySemesterAndYear = courseUnitStorage
        .values()
        .filter(courseUnit => courseUnit.semester === semester && courseUnit.year === year);
    return Result.Ok(courseUnitsBySemesterAndYear);
}

/**
 * Updates a course unit's lecturer by ID.
 * @param id The ID of the course unit to update.
 * @param lecturerId The ID of the new lecturer.
 * @returns A Result containing the updated course unit if successful, or an error message if failed.
 */
$update;
export function updateCourseUnitLecturer(id: string, lecturerId: string): Result<CourseUnit, string> {
    return match(courseUnitStorage.get(id), {
        Some: (courseUnit) => {
            const updatedCourseUnit: CourseUnit = { ...courseUnit, lecturerId, updatedAt: Opt.Some(ic.time()) };
            courseUnitStorage.insert(courseUnit.id, updatedCourseUnit);
            return Result.Ok<CourseUnit, string>(updatedCourseUnit);
        },
        None: () => Result.Err<CourseUnit, string>(`Couldn't update the lecturer for course unit with id=${id}. Course unit not found`)
    });
}

/**
 * Updates a course unit's name by ID.
 * @param id The ID of the course unit to update.
 * @param name The new name for the course unit.
 * @returns A Result containing the updated course unit if successful, or an error message if failed.
 */
$update;
export function updateCourseUnitName(id: string, name: string): Result<CourseUnit, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid course unit ID.");
    }
    if (!name) {
        return Result.Err("Invalid name. Name field is required.");
    }

    return match(courseUnitStorage.get(id), {
        Some: (courseUnit) => {
            const updatedCourseUnit: CourseUnit = { ...courseUnit, name, updatedAt: Opt.Some(ic.time()) };
            courseUnitStorage.insert(courseUnit.id, updatedCourseUnit);
            return Result.Ok<CourseUnit, string>(updatedCourseUnit);
        },
        None: () => Result.Err<CourseUnit, string>(`Couldn't update the name for course unit with id=${id}. Course unit not found`)
    });
}

/**
 * Retrieves course units by name.
 * @param name The name or part of the name to search for.
 * @returns A Result containing a list of matching course units if successful, or an error message if failed.
 */
$query;
export function searchCourseUnitsByName(name: string): Result<Vec<CourseUnit>, string> {
    const matchingCourseUnits = courseUnitStorage
        .values()
        .filter(courseUnit => courseUnit.name.toLowerCase().includes(name.toLowerCase()));
    return Result.Ok(matchingCourseUnits);
}

/**
 * Retrieves course units by semester.
 * @param semester The semester to filter course units by.
 * @returns A Result containing a list of course units if successful, or an error message if failed.
 */
$query;
export function getCourseUnitsBySemester(semester: string): Result<Vec<CourseUnit>, string> {
    const courseUnitsBySemester = courseUnitStorage
        .values()
        .filter(courseUnit => courseUnit.semester === semester);
    return Result.Ok(courseUnitsBySemester);
}

/**
 * Retrieves course units by year.
 * @param year The year to filter course units by.
 * @returns A Result containing a list of course units if successful, or an error message if failed.
 */
$query;
export function getCourseUnitsByYear(year: number): Result<Vec<CourseUnit>, string> {
    const courseUnitsByYear = courseUnitStorage
        .values()
        .filter(courseUnit => courseUnit.year === year);
    return Result.Ok(courseUnitsByYear);
}

/**
 * Retrieves a sorted list of course units by name.
 * @returns A Result containing a sorted list of course units by name if successful, or an error message if failed.
 */
$query;
export function getCourseUnitsSortedByName(): Result<Vec<CourseUnit>, string> {
    const sortedCourseUnits = courseUnitStorage.values().sort((a, b) => a.name.localeCompare(b.name));
    return Result.Ok(sortedCourseUnits);
}

/**
 * Retrieves a paginated list of course units.
 * @param page The page number of the pagination.
 * @param pageSize The size of each page.
 * @returns A Result containing a paginated list of course units if successful, or an error message if failed.
 */
$query;
export function getCourseUnitsWithPagination(page: number, pageSize: number): Result<Vec<CourseUnit>, string> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCourseUnits = courseUnitStorage.values().slice(startIndex, endIndex);
    return Result.Ok(paginatedCourseUnits);
}

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};
