interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  full_name: string;
}

interface AuthResponse {
  email: string;
  message: string;
  token: string;
  full_name?: string;
}

const API_BASE_URL = "http://localhost:5001";

// Token management
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
  }
};

// User data management
export const getUserData = () => {
  if (typeof window === "undefined") return null;
  return {
    email: localStorage.getItem("user_email"),
    name: localStorage.getItem("user_name"),
  };
};

export const setUserData = (email: string, name?: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user_email", email);
    if (name) {
      localStorage.setItem("user_name", name);
    }
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    // Basic JWT expiration check
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch {
    return false;
  }
};

// API calls
export const loginUser = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export const signupUser = async (
  userData: SignupRequest
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

// Logout function
export const logoutUser = (): void => {
  removeAuthToken();
};
