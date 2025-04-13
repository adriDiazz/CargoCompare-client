import { TariffTypes } from "./TariffTypes";

export interface GeneralTariffs {
  id: number;
  parameter: number;
  price: number;
  tariffType: TariffTypes;
  tariffConditions: TariffConditions[];
  supplier: Supplier;
}

export interface LogisticCompany {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  webSite: string;
  logo: string;
  cif: string;
  socialReason: string;
  description: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  employees: UserFullData[];
  companySuppliers: LogisticCompanySupplier[];
}

export interface LogisticCompanySupplier {
  id: number;
  logisticCompany: LogisticCompany;
  supplier: Supplier;
  tariffId: number;
}

export interface Province {
  id: number;
  name: string;
  code: string;
  supplierZones: SupplierZones[];
}

export interface Supplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  webSite: string;
  logo: string;
  cif: string;
  socialReason: string;
  description: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  generalTariffs: GeneralTariffs[];
  companySuppliers: LogisticCompanySupplier[];
  supplierZones: SupplierZones[];
  employees: UserFullData[];
}

export interface SupplierZones {
  id: number;
  province: Province;
  supplier: Supplier;
  zone: number;
}

export interface TariffConditions {
  id: number;
  type: string;
  factor: number;
  generalTariffs: GeneralTariffs;
}

export interface TariffConditionsDTO {

  type: string;
  factor: number;

}


export interface CreateTariffRequest {
  parameter: string;
  price: number;
  tariffType: TariffTypes;
  supplierId: string | undefined;
  logisticCompanyId: string | undefined;
} 


export interface GeneralTariffs {
  id: number;
  parameter: number;
  price: number;
  tariffType: TariffTypes;
  tariffConditions: TariffConditions[];
  supplier: Supplier;
}

export interface GeneralTariffDTO {
  id: number;
  parameter: string;
  price: number;
  tariffType: TariffTypes;
  supplier: number;
  conditions: TariffConditionsDTO[];
}

export interface LogisticCompany {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  webSite: string;
  logo: string;
  cif: string;
  socialReason: string;
  description: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  employees: UserFullData[];
  companySuppliers: LogisticCompanySupplier[];
}

export interface LogisticCompanySupplier {
  id: number;
  logisticCompany: LogisticCompany;
  supplier: Supplier;
  tariffId: number;
}

export interface Province {
  id: number;
  name: string;
  code: string;
  supplierZones: SupplierZones[];
}

export interface Supplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  webSite: string;
  logo: string;
  cif: string;
  socialReason: string;
  description: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  generalTariffs: GeneralTariffs[];
  companySuppliers: LogisticCompanySupplier[];
  supplierZones: SupplierZones[];
  employees: UserFullData[];
}

export interface SupplierZones {
  id: number;
  province: Province;
  supplier: Supplier;
  zone: number;
}

export interface TariffConditions {
  id: number;
  type: string;
  factor: number;
  generalTariffs: GeneralTariffs;
}

// export interface TariffTypes {
//   id: number;
//   name: string;
//   description: string;
//   generalTariffs: GeneralTariffs;
// }

export interface UserFullData {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  isEnabled: boolean;
  isAccountNonExpired: boolean;
  isAccountNonLocked: boolean;
  isCredentialsNonExpired: boolean;
  isVerified: boolean;
  verificationCode: string;
  mfaEnabled: boolean;
  secret: string;
  role: Role;
  logisticCompany?: LogisticCompany;
  supplier?: Supplier;
}


export interface UserDTO {
  name: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  authorities: GrantedAuthority[];
  logisticCompany?: LogisticCompany;
  supplier?: Supplier;
}

export interface GrantedAuthority {
  authority: string;
}


export type Role = 'USER' | 'ADMIN' | 'MANAGER';


export interface CompanieForTable {
  Id: number;
  Logo: string;
  Nombre: string;
  CodigoPostal: string;
  Ciudad: string;
  Provincia: string;

}


