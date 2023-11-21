import { PostgrestError } from '@supabase/supabase-js';

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
export type DbResultErr = PostgrestError;

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
export type Payload<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      fields: {
        Row: {
          available: boolean | null;
          created_at: string | null;
          id: string;
          indoor: boolean | null;
          keeperId: string | null;
          location: string | null;
          name: string | null;
          playerBench: boolean | null;
          pricePerHour: number | null;
          syntheticGrass: boolean | null;
          updated_at: string | null;
          watcherBench: boolean | null;
        };
        Insert: {
          available?: boolean | null;
          created_at?: string | null;
          id?: string;
          indoor?: boolean | null;
          keeperId?: string | null;
          location?: string | null;
          name?: string | null;
          playerBench?: boolean | null;
          pricePerHour?: number | null;
          syntheticGrass?: boolean | null;
          updated_at?: string | null;
          watcherBench?: boolean | null;
        };
        Update: {
          available?: boolean | null;
          created_at?: string | null;
          id?: string;
          indoor?: boolean | null;
          keeperId?: string | null;
          location?: string | null;
          name?: string | null;
          playerBench?: boolean | null;
          pricePerHour?: number | null;
          syntheticGrass?: boolean | null;
          updated_at?: string | null;
          watcherBench?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fields_keeperId_fkey';
            columns: ['keeperId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      reservations: {
        Row: {
          created_at: string | null;
          customerId: string | null;
          customerName: string | null;
          fieldId: string | null;
          hourRange: number | null;
          id: string;
          orderDate: string | null;
          paidStatus: boolean | null;
          totalPrice: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          customerId?: string | null;
          customerName?: string | null;
          fieldId?: string | null;
          hourRange?: number | null;
          id?: string;
          orderDate?: string | null;
          paidStatus?: boolean | null;
          totalPrice?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          customerId?: string | null;
          customerName?: string | null;
          fieldId?: string | null;
          hourRange?: number | null;
          id?: string;
          orderDate?: string | null;
          paidStatus?: boolean | null;
          totalPrice?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'reservations_customerId_fkey';
            columns: ['customerId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_fieldId_fkey';
            columns: ['fieldId'];
            isOneToOne: false;
            referencedRelation: 'fields';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          phone_number: string | null;
          role: Database['public']['Enums']['user_role'] | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          phone_number?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          phone_number?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'pelanggan' | 'penjaga' | 'admin';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
