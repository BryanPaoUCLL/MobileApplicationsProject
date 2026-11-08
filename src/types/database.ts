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
      categories: {
        Row: {
          is_active: boolean
          name: string
          parent_slug: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          is_active?: boolean
          name: string
          parent_slug?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          is_active?: boolean
          name?: string
          parent_slug?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_slug_fkey"
            columns: ["parent_slug"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["slug"]
          },
        ]
      }
      companies: {
        Row: {
          country_code: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          country_code?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      currencies: {
        Row: {
          code: string
          is_enabled: boolean
          minor_unit: number
          name: string
          symbol: string
        }
        Insert: {
          code: string
          is_enabled?: boolean
          minor_unit: number
          name: string
          symbol: string
        }
        Update: {
          code?: string
          is_enabled?: boolean
          minor_unit?: number
          name?: string
          symbol?: string
        }
        Relationships: []
      }
      exchange_rates: {
        Row: {
          base_currency: string
          created_at: string
          effective_at: string
          id: number
          provider: string
          quote_currency: string
          rate: number
        }
        Insert: {
          base_currency: string
          created_at?: string
          effective_at: string
          id?: never
          provider: string
          quote_currency: string
          rate: number
        }
        Update: {
          base_currency?: string
          created_at?: string
          effective_at?: string
          id?: never
          provider?: string
          quote_currency?: string
          rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "exchange_rates_base_currency_fkey"
            columns: ["base_currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "exchange_rates_quote_currency_fkey"
            columns: ["quote_currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
        ]
      }
      game_companies: {
        Row: {
          company_id: string
          created_at: string
          game_id: string
          is_primary: boolean
          role: string
          user_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          game_id: string
          is_primary?: boolean
          role: string
          user_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          game_id?: string
          is_primary?: boolean
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_companies_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string
          id: string
          name: string
          release_date: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          release_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          release_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      game_genres: {
        Row: {
          created_at: string
          game_id: string
          genre_slug: string
        }
        Insert: {
          created_at?: string
          game_id: string
          genre_slug: string
        }
        Update: {
          created_at?: string
          game_id?: string
          genre_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_genres_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_genres_genre_slug_fkey"
            columns: ["genre_slug"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["slug"]
          },
        ]
      }
      genres: {
        Row: {
          created_at: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_slug: string
          created_at: string
          description: string | null
          game_id: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_slug: string
          created_at?: string
          description?: string | null
          game_id?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          category_slug?: string
          created_at?: string
          description?: string | null
          game_id?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_slug_fkey"
            columns: ["category_slug"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "products_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          default_currency: string
          display_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_currency?: string
          display_name: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_currency?: string
          display_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_default_currency_fkey"
            columns: ["default_currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
        ]
      }
      purchases: {
        Row: {
          amount_minor: number
          created_at: string
          currency_code: string
          id: string
          notes: string | null
          product_id: string
          purchased_at: string
          region_code: string | null
          regional_price_id: string | null
          store_id: string | null
          subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_minor: number
          created_at?: string
          currency_code: string
          id?: string
          notes?: string | null
          product_id: string
          purchased_at?: string
          region_code?: string | null
          regional_price_id?: string | null
          store_id?: string | null
          subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          amount_minor?: number
          created_at?: string
          currency_code?: string
          id?: string
          notes?: string | null
          product_id?: string
          purchased_at?: string
          region_code?: string | null
          regional_price_id?: string | null
          store_id?: string | null
          subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "purchases_product_id_user_id_fkey"
            columns: ["product_id", "user_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "purchases_regional_price_id_user_id_product_id_fkey"
            columns: ["regional_price_id", "user_id", "product_id"]
            isOneToOne: false
            referencedRelation: "regional_prices"
            referencedColumns: ["id", "user_id", "product_id"]
          },
          {
            foreignKeyName: "purchases_store_id_user_id_fkey"
            columns: ["store_id", "user_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "purchases_subscription_id_user_id_product_id_fkey"
            columns: ["subscription_id", "user_id", "product_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id", "user_id", "product_id"]
          },
        ]
      }
      regional_prices: {
        Row: {
          amount_minor: number
          created_at: string
          currency_code: string
          id: string
          is_available: boolean
          observed_at: string
          product_id: string
          region_code: string
          source_url: string | null
          store_id: string
          tax_included: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_minor: number
          created_at?: string
          currency_code: string
          id?: string
          is_available?: boolean
          observed_at?: string
          product_id: string
          region_code: string
          source_url?: string | null
          store_id: string
          tax_included?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          amount_minor?: number
          created_at?: string
          currency_code?: string
          id?: string
          is_available?: boolean
          observed_at?: string
          product_id?: string
          region_code?: string
          source_url?: string | null
          store_id?: string
          tax_included?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "regional_prices_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "regional_prices_product_id_user_id_fkey"
            columns: ["product_id", "user_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "regional_prices_store_id_user_id_fkey"
            columns: ["store_id", "user_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
      stores: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount_minor: number
          billing_interval: number
          billing_unit: string
          created_at: string
          currency_code: string
          ended_on: string | null
          id: string
          is_active: boolean
          next_billing_on: string | null
          product_id: string
          started_on: string
          store_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_minor: number
          billing_interval?: number
          billing_unit: string
          created_at?: string
          currency_code: string
          ended_on?: string | null
          id?: string
          is_active?: boolean
          next_billing_on?: string | null
          product_id: string
          started_on?: string
          store_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          amount_minor?: number
          billing_interval?: number
          billing_unit?: string
          created_at?: string
          currency_code?: string
          ended_on?: string | null
          id?: string
          is_active?: boolean
          next_billing_on?: string | null
          product_id?: string
          started_on?: string
          store_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "subscriptions_product_id_user_id_fkey"
            columns: ["product_id", "user_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "subscriptions_store_id_user_id_fkey"
            columns: ["store_id", "user_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id", "user_id"]
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

