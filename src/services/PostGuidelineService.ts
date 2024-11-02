import { supabase } from "@/supabase";
import type { PostGuideline } from "@/types";

export class PostGuidelineService {
  async getGuideline(userId: string): Promise<PostGuideline | null> {
    const { data, error } = await supabase
      .from("post_guidelines")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // no rows returned
      throw error;
    }
    return data;
  }

  async addGuideline(userId: string, content: string): Promise<PostGuideline> {
    const { data, error } = await supabase
      .from("post_guidelines")
      .insert({ user_id: userId, content })
      .single();

    if (error) throw error;
    return data;
  }

  async updateGuideline(id: string, content: string): Promise<PostGuideline> {
    const { data, error } = await supabase
      .from("post_guidelines")
      .update({ content })
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async deleteGuideline(id: string): Promise<void> {
    const { error } = await supabase
      .from("post_guidelines")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
