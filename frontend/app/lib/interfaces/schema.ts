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
      jobs: {
        Row: {
          content: Json | null
          created_at: string | null
          id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          id: string
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          dob: string | null
          firstname: string | null
          id: string
          lastname: string | null
          roles: Database["public"]["Enums"]["account_role"]
        }
        Insert: {
          created_at?: string | null
          dob?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
          roles?: Database["public"]["Enums"]["account_role"]
        }
        Update: {
          created_at?: string | null
          dob?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          roles?: Database["public"]["Enums"]["account_role"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
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
      account_role: "freelancer" | "jobseeker" | "organization"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
