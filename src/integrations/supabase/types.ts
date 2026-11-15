export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      alert_logs: {
        Row: {
          alert_type: string
          id: string
          message_body: string
          profile_id: string
          recipient_email: string
          sent_at: string
          subject: string
        }
        Insert: {
          alert_type: string
          id?: string
          message_body: string
          profile_id: string
          recipient_email: string
          sent_at?: string
          subject: string
        }
        Update: {
          alert_type?: string
          id?: string
          message_body?: string
          profile_id?: string
          recipient_email?: string
          sent_at?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "care_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          date_time: string
          doctor_name: string
          id: string
          location: string
          notes: string
          profile_id: string
          specialty: string
        }
        Insert: {
          date_time: string
          doctor_name: string
          id?: string
          location: string
          notes?: string
          profile_id: string
          specialty: string
        }
        Update: {
          date_time?: string
          doctor_name?: string
          id?: string
          location?: string
          notes?: string
          profile_id?: string
          specialty?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "care_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_pin_attempts: {
        Row: {
          attempted_at: string
          id: string
        }
        Insert: {
          attempted_at?: string
          id?: string
        }
        Update: {
          attempted_at?: string
          id?: string
        }
        Relationships: []
      }
      care_profiles: {
        Row: {
          age: number
          allergies: string[]
          caretaker_emails: string[]
          conditions: string[]
          elderly_name: string
          id: string
          is_demo: boolean
          passcode: string
        }
        Insert: {
          age: number
          allergies?: string[]
          caretaker_emails?: string[]
          conditions?: string[]
          elderly_name: string
          id?: string
          is_demo?: boolean
          passcode: string
        }
        Update: {
          age?: number
          allergies?: string[]
          caretaker_emails?: string[]
          conditions?: string[]
          elderly_name?: string
          id?: string
          is_demo?: boolean
          passcode?: string
        }
        Relationships: []
      }
      care_sessions: {
        Row: {
          expires_at: string
          id: string
          profile_id: string
          role: string
          token: string
        }
        Insert: {
          expires_at?: string
          id?: string
          profile_id: string
          role: string
          token: string
        }
        Update: {
          expires_at?: string
          id?: string
          profile_id?: string
          role?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "care_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          dosage: string
          frequency: string
          id: string
          instructions: string
          name: string
          profile_id: string
          scheduled_time: string
          status: string
          taken_at: string | null
          time_of_day: string
        }
        Insert: {
          dosage: string
          frequency?: string
          id?: string
          instructions?: string
          name: string
          profile_id: string
          scheduled_time: string
          status?: string
          taken_at?: string | null
          time_of_day?: string
        }
        Update: {
          dosage?: string
          frequency?: string
          id?: string
          instructions?: string
          name?: string
          profile_id?: string
          scheduled_time?: string
          status?: string
          taken_at?: string | null
          time_of_day?: string
        }
        Relationships: [
          {
            foreignKeyName: "medications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "care_profiles"
            referencedColumns: ["id"]
          },
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
