export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          dob: string | null
          first_name: string
          id: number
          last_name: string | null
          role: Database["public"]["Enums"]["role"]
          user_name: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string | null
          dob?: string | null
          first_name: string
          id?: number
          last_name?: string | null
          role?: Database["public"]["Enums"]["role"]
          user_name?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string | null
          dob?: string | null
          first_name?: string
          id?: number
          last_name?: string | null
          role?: Database["public"]["Enums"]["role"]
          user_name?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "FREELANCER" | "JOBSEEKER" | "ORG"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
