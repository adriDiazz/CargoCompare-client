import { create } from "zustand";
import { Supplier } from "../../interfaces/types"; // ajusta la ruta según dónde lo tengas

interface SuppliersList {
  suppliers: Supplier[];         
  isLoading: boolean;            
  setLoading: (isLoading: boolean) => void;
  setSuppliers: (suppliers: Supplier[]) => void;
  addNewSupplier: (supplier: Supplier) => void;
  updateSupplierStore: (company: Supplier) => void;
  deleteSupplierStore: (companyId: number) => void;
}

export const useSuppliersListStore = create<SuppliersList>((set) => ({
  suppliers: [],
  isLoading: true,
  setLoading: (isLoading) => set({ isLoading }),

  setSuppliers: (suppliers) =>
    set({ suppliers }),

  addNewSupplier: (supplier) =>
    set((state) => ({ suppliers: [...state.suppliers, supplier] })),
  updateSupplierStore: (supplier) => 
    set((state) => ({
      suppliers: state.suppliers.map((s: Supplier) =>
        s.id === supplier.id ? supplier : s
      ),
    })),
  deleteSupplierStore: (supplierId) =>
    set((state) => ({
      suppliers: state.suppliers.filter((s: Supplier) => s.id !== supplierId),
       })),
}));
