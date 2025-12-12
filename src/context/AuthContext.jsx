import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Initial token load
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true);

  // 1. Initialize Auth on Load
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          await fetchProfile(token);
        } catch (err) {
          console.error("Auto-login failed:", err);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  // 2. Fetch User Profile (Updated for your Backend Structure)
  const fetchProfile = async (currentToken) => {
    const response = await fetch("http://localhost:3000/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const responseData = await response.json();

    // FIX: Your backend returns { success: true, data: { user: {...} } }
    // We need to extract the 'user' object from inside 'data'
    if (responseData.data && responseData.data.user) {
      setUser(responseData.data.user);
    } else {
      // Fallback in case structure changes
      setUser(responseData);
    }
  };

  // 3. Login Action (Updated for your Backend Structure)
  const login = async (email, password) => {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Login failed");
    }

    // FIX: Extract token from responseData.data.accessToken
    // Your backend structure: { data: { accessToken: "..." } }
    const accessToken = responseData.data?.accessToken;
    const refreshToken = responseData.data?.refreshToken;

    if (!accessToken) {
      throw new Error("Login successful but no token received.");
    }

    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    setToken(accessToken);

    // Pass the extracted token to fetchProfile
    await fetchProfile(accessToken);
    return responseData;
  };

  // 4. Register Action (Updated for your Backend Structure)
  const register = async (firstName, lastName, email, password) => {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Registration failed");
    }

    // Optional: Auto-login after register if your backend sends tokens on register
    if (responseData.data?.accessToken) {
      const accessToken = responseData.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      setToken(accessToken);
      await fetchProfile(accessToken);
    }

    return responseData;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    fetchProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
