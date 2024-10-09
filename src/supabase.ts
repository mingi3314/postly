// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.VUE_APP_SUPABASE_URL as string; // TODO: undefined인 경우 처리
// const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY as string;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// src/mocks/mockSupabase.ts
import type { User } from "@supabase/supabase-js";

type MockAuthResponse = {
  data: {
    user: User | null;
  };
  error: any;
};

export const mockSupabase = {
  auth: {
    signInWithPassword: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<MockAuthResponse> => {
      // Mock 로그인 로직
      if (email === "test@example.com" && password === "password") {
        return {
          data: {
            user: {
              id: "1",
              email: "test@example.com",
              aud: "1",
              created_at: "2024-02-20T12:00:00Z",
              app_metadata: {},
              user_metadata: {},
              // 기타 속성
            },
          },
          error: null,
        };
      } else {
        return {
          data: { user: null },
          error: { message: "Invalid credentials" },
        };
      }
    },
    signUp: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<MockAuthResponse> => {
      // Mock 회원가입 로직
      if (email && password) {
        return {
          data: {
            user: {
              id: "2",
              email,
              aud: "2",
              created_at: "2024-02-20T12:00:00Z",
              app_metadata: {},
              user_metadata: {},
            },
          },
          error: null,
        };
      } else {
        return {
          data: { user: null },
          error: { message: "Invalid input" },
        };
      }
    },
    signOut: async (): Promise<{ error: any }> => {
      // Mock 로그아웃 로직
      return { error: null };
    },
    getUser: async (): Promise<{ data: { user: User | null } }> => {
      // Mock 사용자 조회 로직
      return {
        data: {
          user: {
            id: "1",
            email: "test@example.com",
            aud: "1",
            created_at: "2024-02-20T12:00:00Z",
            app_metadata: {},
            user_metadata: {},
          },
        },
      };
    },
  },
};

export const supabase = mockSupabase;
