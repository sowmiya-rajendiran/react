
import { createContext, useContext, useEffect, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {

    const [formData, setFormData] = useState({
        senderName: '',
        senderEmail :'',
        senderAddress :'',
        customarName: '',
        customarEmail :'',
        customarAddress :'',
        invoiceNumber: '',
        date: '',

    });

    // data updated function
    const updateFormData = (name, value) => {
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const [invoiceItems, setInvoiceItems] = useState([]);

    const addInvoiceItem = () => {
        setInvoiceItems((prev) => [
            ...prev,
            {
            name: '',
            quantity: 1,
            unitPrice: 0,
            description: '',
            isEditable: true,
            taxRate : 0
            },
        ]);
    };

    // data Calculation function
    const calculateTotals = () => {
        let subtotal = 0;
        let totalTax = 0;

        invoiceItems.forEach((item) => {
            if (!item.name || item.quantity <= 0 || item.unitPrice < 0) return;

            const itemTotal = item.quantity * item.unitPrice;
            const itemTax = (item.taxRate / 100) * itemTotal;

            subtotal += itemTotal;
            totalTax += itemTax;
        });

        const grandTotal = subtotal + totalTax;

        return { subtotal, tax: totalTax, grandTotal };
    };



    const updateInvoiceItem = (index, field, value) => {
        const updated = [...invoiceItems];
        updated[index][field] = field === "quantity" || field === "unitPrice" ? Number(value) : value;
        setInvoiceItems(updated);
    };

    const toggleItemEditable = (index) => {
        const updated = [...invoiceItems];
        updated[index].isEditable = !updated[index].isEditable;
        setInvoiceItems(updated);
    };

    const removeInvoiceItem = (index) => {
        const updated = [...invoiceItems];
        updated.splice(index, 1);
        setInvoiceItems(updated);
    };


    return (
        <FormContext.Provider value={{ formData, updateFormData, invoiceItems, addInvoiceItem, updateInvoiceItem, removeInvoiceItem ,toggleItemEditable , calculateTotals  }}>
            {children}
        </FormContext.Provider>
    );
};

// Create Custom Hook 
export const useFormContext = () => useContext(FormContext);