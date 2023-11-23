export interface ReservationPayload {
  id: string;
  fieldId: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  hourRange: string;
  totalPrice: number;
  paidStatus: boolean;
  created_at: string;
  updated_at: string;
  users: UserPayload;
  fields: FieldPayload;
}

export interface FieldPayload {
  id?: string;
  keeperId?: string;
  name?: string;
  location?: string;
  pricePerHour?: number;
  syntheticGrass?: boolean;
  indoor?: boolean;
  playerBench?: string;
  watcherBench?: string;
  available?: string;
  created_at?: string;
  updated_at?: string;
  users?: UserPayload;
}

export interface UserPayload {
  id?: string;
  email?: string;
  username?: string;
  full_name?: string;
  phone_number?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}