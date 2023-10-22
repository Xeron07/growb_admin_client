import { useState } from "react";
import { fetchTransection, createTransection } from "../api/transections"; // Replace with your actual API module
import { toast } from "react-toastify";

const useTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchTransactionData = async (shopId: number, trackId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchTransection(shopId, trackId);
      if (result.success) {
        // Handle success
        // Example: const transactions = result.data as TransactionData[];
        return result.data;
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("An error occurred while fetching transactions.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createTransection(data);
      if (result.success) {
        // Handle success
        // Example: const newTransaction = result.data as TransactionData;
        toast.success("Transection added succesfully");
        return result.data;
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("An error occurred while creating a transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchTransactionData, addTransaction, isLoading, error };
};

export default useTransaction;
