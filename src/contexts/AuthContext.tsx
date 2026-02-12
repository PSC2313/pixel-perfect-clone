import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AssessmentData {
  salarioBruto?: number;
  horasSemana?: number;
  tempoDeslocamento?: number;
  valorHoraBruta?: number;
  valorHoraLiquida?: number;
  areasInteresse?: string[];
  discProfile?: "D" | "I" | "S" | "C";
  discScores?: { D: number; I: number; S: number; C: number };
  completed?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  assessment?: AssessmentData;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateAssessment: (data: AssessmentData) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS_KEY = "upjobs_users";
const MOCK_SESSION_KEY = "upjobs_session";

const getUsers = (): Array<User & { password: string }> => {
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]");
  } catch { return []; }
};

const saveUsers = (users: Array<User & { password: string }>) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = localStorage.getItem(MOCK_SESSION_KEY);
    if (session) {
      try { setUser(JSON.parse(session)); } catch { /* ignore */ }
    }
  }, []);

  const persistUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(userData));
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const userData: User = { id: found.id, name: found.name, email: found.email, assessment: found.assessment };
      persistUser(userData);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) return false;
    const newUser = { id: crypto.randomUUID(), name, email, password } as User & { password: string };
    saveUsers([...users, newUser]);
    const userData: User = { id: newUser.id, name, email };
    persistUser(userData);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(MOCK_SESSION_KEY);
  };

  const updateAssessment = (data: AssessmentData) => {
    if (!user) return;
    const updated = { ...user, assessment: { ...user.assessment, ...data } };
    persistUser(updated);
    // Also update in mock users DB
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], assessment: updated.assessment };
      saveUsers(users);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateAssessment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
