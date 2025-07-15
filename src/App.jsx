import { useEffect, useRef } from "react";
import CustomarDetails from "./components/CustomarDetails";
import InvoiceItems from "./components/InvoiceItems";
import SenderDetails from "./components/SenderDetails";
import { useFormContext } from "./Context/FormContext";
import html2pdf from 'html2pdf.js';

function App(){

    const { formData, updateFormData, invoiceItems  } = useFormContext();

    // Data stored in Local Storage
    useEffect(() => {
        localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
    }, [invoiceItems]);

    useEffect(() => {
        localStorage.setItem("ClientData", JSON.stringify(formData));
    }, [formData]);

    // Save Btn Handling
    let handleFormSubmit =(e) => {
       e.preventDefault();
       if (!isValidInvoice()) {
            alert("Please fill all required fields and at least one valid item.");
            return;
        }

        localStorage.setItem("ClientData", JSON.stringify(formData));
        localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));

        alert("Invoice saved successfully!");
    }

    const invoiceRef = useRef();

    const isValidInvoice = () => {

        const requiredFields = [
            formData.senderName,
            formData.senderEmail,
            formData.senderAddress,
            formData.customarName,
            formData.customarEmail,
            formData.customarAddress,
            formData.invoiceNumber,
            formData.date,
        ];

        const areFieldsFilled = requiredFields.every((field) => field && field.trim() !== "");

            const areItemsValid =
                invoiceItems.length > 0 &&
                invoiceItems.every(
                (item) =>
                    item.name &&
                    item.name.trim() !== "" &&
                    item.quantity > 0 &&
                    item.unitPrice >= 0
                );

            return areFieldsFilled && areItemsValid;
    };

    // Download Pdf function Using html2pdf
    const handleDownloadPDF = () => {
        if (!isValidInvoice()) {
            alert("Please fill in all required fields and add at least one valid invoice item.");
            return;
        }

        const pdfContent = invoiceRef.current;
        if (!pdfContent) return;

        pdfContent.style.display = "block";

        html2pdf()
            .from(pdfContent)
            .set({
            margin: 1,
            filename: 'invoice.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            })
            .save()
            .then(() => {
            pdfContent.style.display = "none";
            });;
    };

    const calculateSubtotal = () =>
        invoiceItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

        const calculateTax = () =>
        invoiceItems.reduce(
            (sum, item) =>
            sum + (item.taxRate ? (item.taxRate / 100) * item.quantity * item.unitPrice : 0),
            0
    );

    const calculateGrandTotal = () => calculateSubtotal() + calculateTax();

    return(
        <>
            <div>
                <div className="bg-[#384259] md:px-[100px] px-[50px] md:py-[40px] py-[25px] sticky top-0">
                    <h1 className="text-[20px] font-semibold text-center text-white">Invoice Builder</h1>
                </div>
                <div className="bg-white shadow-lg md:px-[50px] px-[25px] py-[30px] xl:mt-[50px] xl:mb-[50px] xl:w-3/4 m-auto">

                    <form onSubmit={handleFormSubmit}>

                        <SenderDetails />

                        <CustomarDetails />
                        
                        <div className="grid grid-cols-2 gap-[25px] mb-[25px] mt-[25px]">
                            <div>
                                <label htmlFor="invoicenum" className="mr-[20px]">Invoice Number</label> <br></br>
                                <input type="text" 
                                    id="invoicenum" 
                                    required 
                                    name="invoiceNumber"
                                    value={formData.invoiceNumber}
                                    onChange={(e) => updateFormData(e.target.name, e.target.value)}
                                    className="w-full border border-[#ced4da] px-[16px] py-[15px] rounded-[4px] focus:border-blue-500 focus:outline-none mt-[10px] h-[40px]">
                                </input>

                            </div>
                            <div>
                                <label htmlFor="date" className="mr-[20px]">Date</label> <br></br>
                                <input type="date"    
                                    id="date" 
                                    required 
                                    name="date"
                                    value={formData.date}
                                    onChange={(e) => updateFormData(e.target.name, e.target.value)}
                                    className="w-full border border-[#ced4da] px-[16px] py-[15px] rounded-[4px] focus:border-blue-500 focus:outline-none mt-[10px] h-[40px]">

                                </input>

                            </div>

                        </div>

                        <InvoiceItems />

                        <button type="submit" 
                            className="px-[25px] py-[8px] rounded-[4px] bg-[#384259] text-white cursor-pointer mt-[25px]">Save</button>
                        <button type="button"
                            onClick={handleDownloadPDF}
                            className="px-[25px] py-[8px] rounded-[4px] bg-[#384259] text-white cursor-pointer mt-[25px] ml-[20px]">Download PDF</button>
                    </form>

                </div>
            </div>

            {/* PDF Format in html*/}
            <div
                ref={invoiceRef}
                style={{ display: "none" }} 
                
                >
                <div className="px-3 py-5 text-left text-black">
                    <h2 className="text-xl font-bold mb-4">Invoice</h2>
                    <p><strong>From:</strong> {formData.senderName}, {formData.senderEmail}</p>
                    <p><strong>To:</strong> {formData.customarName}, {formData.customarEmail}</p>
                    <p><strong>Invoice #:</strong> {formData.invoiceNumber}</p>
                    <p><strong>Date:</strong> {formData.date}</p>

                    <table className="w-full mt-6 border border-black text-sm">
                    <thead>
                        <tr>
                        <th className="border border-black p-2">Name</th>
                        <th className="border border-black p-2">Qty</th>
                        <th className="border border-black p-2">Unit Price</th>
                        <th className="border border-black p-2">Tax %</th>
                        <th className="border border-black p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceItems.map((item, i) => (
                        <tr key={i}>
                            <td className="border border-black p-2">{item.name}</td>
                            <td className="border border-black p-2">{item.quantity}</td>
                            <td className="border border-black p-2">₹{item.unitPrice}</td>
                            <td className="border border-black p-2">{item.taxRate || 0}%</td>
                            <td className="border border-black p-2">
                            ₹{(item.quantity * item.unitPrice).toFixed(2)}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

                    <div className="mt-4 text-right">
                        <p>Subtotal: ₹{calculateSubtotal().toFixed(2)}</p>
                        <p>Tax: ₹{calculateTax().toFixed(2)}</p>
                        <p className="font-bold">Grand Total: ₹{calculateGrandTotal().toFixed(2)}</p>
                    </div>
                </div>
            </div>

        
        </>
       
    )
}

export default App;