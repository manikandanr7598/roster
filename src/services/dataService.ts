import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { mockEmployees, mockShifts, mockDepartments } from "../utils/mockData";
import type { Employee, Shift, Department } from "../types";

// ------------------------------
// Employees CRUD
// ------------------------------
export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "employees"));
    if (querySnapshot.empty) {
      // If no employees in Firebase, use mock data and seed database
      await seedInitialData();
      return mockEmployees;
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Employee));
  } catch (error) {
    console.error("Error getting employees: ", error);
    return mockEmployees;
  }
};

export const addEmployee = async (employee: Omit<Employee, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "employees"), {
      ...employee,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding employee: ", error);
    throw error;
  }
};

export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<boolean> => {
  try {
    const employeeRef = doc(db, "employees", id);
    await updateDoc(employeeRef, updates);
    return true;
  } catch (error) {
    console.error("Error updating employee: ", error);
    throw error;
  }
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "employees", id));
    return true;
  } catch (error) {
    console.error("Error deleting employee: ", error);
    throw error;
  }
};

// ------------------------------
// Shifts CRUD
// ------------------------------
export const getShifts = async (): Promise<Shift[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "shifts"));
    if (querySnapshot.empty) {
      return mockShifts;
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Shift));
  } catch (error) {
    console.error("Error getting shifts: ", error);
    return mockShifts;
  }
};

export const addShift = async (shift: Omit<Shift, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "shifts"), {
      ...shift,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding shift: ", error);
    throw error;
  }
};

export const updateShift = async (id: string, updates: Partial<Shift>): Promise<boolean> => {
  try {
    const shiftRef = doc(db, "shifts", id);
    await updateDoc(shiftRef, updates);
    return true;
  } catch (error) {
    console.error("Error updating shift: ", error);
    throw error;
  }
};

export const deleteShift = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "shifts", id));
    return true;
  } catch (error) {
    console.error("Error deleting shift: ", error);
    throw error;
  }
};

// ------------------------------
// Departments CRUD
// ------------------------------
export const getDepartments = async (): Promise<Department[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "departments"));
    if (querySnapshot.empty) {
      return mockDepartments;
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Department));
  } catch (error) {
    console.error("Error getting departments: ", error);
    return mockDepartments;
  }
};

export const addDepartment = async (department: Omit<Department, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "departments"), {
      ...department,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding department: ", error);
    throw error;
  }
};

export const updateDepartment = async (id: string, updates: Partial<Department>): Promise<boolean> => {
  try {
    const deptRef = doc(db, "departments", id);
    await updateDoc(deptRef, updates);
    return true;
  } catch (error) {
    console.error("Error updating department: ", error);
    throw error;
  }
};

export const deleteDepartment = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "departments", id));
    return true;
  } catch (error) {
    console.error("Error deleting department: ", error);
    throw error;
  }
};

// ------------------------------
// Seed Initial Data
// ------------------------------
const seedInitialData = async (): Promise<void> => {
  try {
    // Seed Departments
    for (const dept of mockDepartments) {
      await addDoc(collection(db, "departments"), {
        name: dept.name,
        hourlyRate: dept.hourlyRate,
        createdAt: serverTimestamp(),
      });
    }
    // Seed Employees
    for (const emp of mockEmployees) {
      await addDoc(collection(db, "employees"), {
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        phone: emp.phone,
        position: emp.position,
        department: emp.department,
        hireDate: emp.hireDate,
        salary: emp.salary,
        status: emp.status,
        createdAt: serverTimestamp(),
      });
    }
    // Seed Shifts
    for (const shift of mockShifts) {
      await addDoc(collection(db, "shifts"), {
        employeeId: shift.employeeId,
        date: shift.date,
        startTime: shift.startTime,
        endTime: shift.endTime,
        status: shift.status,
        notes: shift.notes || '',
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    // Silently fail - we'll use mock data instead
  }
};
