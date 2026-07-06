import { createContext, useContext, useEffect, useState } from "react";
import { Customer } from "../types/customers";
import { GET, POST, PUT, DELETE } from "../../../api/api_utility";

type CustomerContextType = {
  customers: Customer[];
  loading: boolean;
  error: string | null;

  fetchCustomers: () => Promise<void>;
  addCustomer: (data: Partial<Customer>) => Promise<void>;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  viewCustomer: (id: string) => Customer | undefined;
};

const CustomerContext = createContext<CustomerContextType | null>(null);

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API = "/api/v1/user/customers";

  // ✅ FETCH
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await GET<{ data: Customer[] }>(API);
      setCustomers(res.data?.data || []);
    } catch (err) {
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD
  const addCustomer = async (customer: Partial<Customer>) => {
    try {
      setError(null);

      const res = await POST<{ data: Customer }>(API, customer);

      // optimistic update
      setCustomers((prev) => [res.data.data, ...prev]);
    } catch {
      setError("Failed to add customer");
    }
  };

  // ✅ UPDATE
  const updateCustomer = async (id: string, updates: Partial<Customer>) => {
    try {
      setError(null);

      const res = await PUT<{ data: Customer }>(`${API}/${id}`, updates);

      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? res.data.data : c))
      );
    } catch {
      setError("Failed to update customer");
    }
  };

  // ✅ DELETE
  const deleteCustomer = async (id: string) => {
    try {
      setError(null);

      await DELETE(`${API}/${id}`);

      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Failed to delete customer");
    }
  };

  // ✅ VIEW
  const viewCustomer = (id: string) => {
    return customers.find((c) => c.id === id);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        loading,
        error,
        fetchCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        viewCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomers must be used inside Provider");
  return ctx;
};