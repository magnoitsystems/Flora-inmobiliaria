import { Characteristic } from "@/types/Characteristic";

export type User = {
    id_admin: number;
    admin_email: string;
    admin_password: string;
};

export interface Property {
  id: number;
  address: string;
  city: string;
  state: PropertyState;
  price: number;
  description: string;
  ubication: string;
  characteristics: Characteristic[];
  images: { id: number; url: string }[];
  type?: PropertyType;
}

export interface PropertyInput {
    address: string;
    city: string;
    state: PropertyState;
    price: number;
    description: string;
    ubication: string;
    characteristics: Characteristic[];
    images: { id: number; url: string }[];
    type: PropertyType;
    category: PropertyState;
}

export interface PropertyUpdateData {
    address?: string;
    city?: string;
    state: PropertyState;
    ubication?: string;
    price?: number;
    description?: string;
    type?: PropertyType;
}
export interface Image {
    id_image: number;
    id_property: number;
    url: string;
}

export enum PropertyState {
    SALE = "venta",
    SOLD = "vendida",
    RENT = "alquiler",
    RENTED = "alquilada"
}

export enum PropertyType {
    HOME = "casa",
    APARTMENT = "departamento",
    FIELD = "campo",
    COMMERCIAL = "local_comercial",
    LAND = "lote"
}