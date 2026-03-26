"use client";

import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "circle_auth_email";

type CircleAuth = {
  isAuthenticated: boolean;
  email: string | null;
  isLoading: boolean;
  error: string | null;
  verifyMembership: (email: string) => Promise<boolean>;
  logout: () => void;
};

export function useCircleAuth(): CircleAuth {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) setEmail(stored);
  }, []);

  const verifyMembership = useCallback(async (inputEmail: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/circle-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Bir hata oluştu.");
        return false;
      }

      if (data.isMember) {
        sessionStorage.setItem(SESSION_KEY, inputEmail);
        setEmail(inputEmail);
        return true;
      }

      setError("Bu e-posta adresi Divizyon Ağ üyeleri arasında bulunamadı.");
      return false;
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setEmail(null);
    setError(null);
  }, []);

  return {
    isAuthenticated: email !== null,
    email,
    isLoading,
    error,
    verifyMembership,
    logout,
  };
}
