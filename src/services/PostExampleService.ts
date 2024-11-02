import { supabase } from "@/supabase";
import type { PostExample } from "@/types";

export class PostExampleService {
  async fetchExamples(userId: string): Promise<PostExample[]> {
    const { data, error } = await supabase
      .from("post_examples")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  }

  async addExample(userId: string, content: string): Promise<PostExample> {
    const { data, error } = await supabase
      .from("post_examples")
      .insert({ user_id: userId, content })
      .single();

    if (error) throw error;
    return data;
  }

  async updateExample(id: string, content: string): Promise<PostExample> {
    const { data, error } = await supabase
      .from("post_examples")
      .update({ content })
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async deleteExample(id: string): Promise<void> {
    const { error } = await supabase
      .from("post_examples")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
