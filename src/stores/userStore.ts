import { defineStore } from "pinia";
import { supabase } from "../supabase";
import type { User } from "@supabase/supabase-js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async login(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      this.user = data.user;
    },
    async register(email: string, password: string) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      this.user = data.user;
    },
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
    async fetchUser() {
      const { data } = await supabase.auth.getUser();
      this.user = data.user;
    },
  },
});
