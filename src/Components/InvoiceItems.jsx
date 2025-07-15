
import { useFormContext } from "../Context/FormContext";

const InvoiceItems = () => {
    const {
        invoiceItems,
        addInvoiceItem,
        updateInvoiceItem,
        removeInvoiceItem,
        toggleItemEditable,
        calculateTotals
    } = useFormContext();

    const { subtotal, tax, grandTotal } = calculateTotals();


    const handleAddItem = () => {
        const last = invoiceItems[invoiceItems.length - 1];
        if (!last || (last.name && last.quantity > 0 && last.unitPrice >= 0)) {
        addInvoiceItem();
        } else {
        alert("Please complete the current item before adding another.");
        }
    };

    
  return (
    <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>

        {invoiceItems.length === 0 ? (
            <div
            className="rounded px-5 py-3 bg-[#f8f9fa] border-2 border-[#dee2e6] border-dashed cursor-pointer hover:text-[#1e79f2] hover:border-[#1e79f2] hover:border-solid text-center"
            onClick={handleAddItem}
            >
            <h1>+ Add new invoice item</h1>
            </div>
        ) : (
        <>
            <table className="w-full border border-gray-300 my-4 hidden md:table">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Qty</th>
                        <th className="p-2">Unit Price</th>
                        <th className="p-2">Tax %</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceItems.map((item, index) => {
                        
                        const itemBase = item.quantity * item.unitPrice;
                        const itemTax = (item.taxRate / 100) * itemBase;
                        const total = itemBase + itemTax;

                        return (
                        <tr key={index} className="text-center border-t border-gray-300">
                            <td className="p-2">
                                {item.isEditable ? (
                                    <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => updateInvoiceItem(index, "name", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td className="p-2">
                                {item.isEditable ? (
                                    <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateInvoiceItem(index, "quantity", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                    />
                                ) : (
                                    item.quantity
                                )}
                            </td>
                           
                            <td className="p-2">
                                {item.isEditable ? (
                                    <input
                                    type="number"
                                    min="0"
                                    value={item.unitPrice}
                                    onChange={(e) => updateInvoiceItem(index, "unitPrice", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                    />
                                ) : (
                                    item.unitPrice.toFixed(2)
                                )}
                            </td>

                            <td className="p-2">
                                {item.isEditable ? (
                                    <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={item.taxRate}
                                    onChange={(e) => updateInvoiceItem(index, "taxRate", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                    />
                                ) : (
                                    `${item.taxRate}%`
                                )}
                            </td>
                            
                            <td className="p-2">{total.toFixed(2)}</td>
                            <td className="p-2">
                                {item.isEditable ? (
                                    <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateInvoiceItem(index, "description", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                    />
                                ) : (
                                    item.description
                                )}
                            </td>
                            <td className="p-2 space-x-2">
                                <button
                                    type="button"
                                    onClick={() => toggleItemEditable(index)}
                                    className={`${
                                    item.isEditable ? "text-green-500" : "text-blue-500"
                                    } hover:cursor-pointer`}
                                >
                                    {item.isEditable ? "✔️" : "Edit"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeInvoiceItem(index)}
                                    className="text-red-500 hover:cursor-pointer"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Mobile card view (only shown on small screens) */}
            <div className="md:hidden space-y-4">
                {invoiceItems.map((item, index) => {
                    const itemBase = item.quantity * item.unitPrice;
                    const itemTax = (item.taxRate / 100) * itemBase;
                    const total = itemBase + itemTax;

                    return (
                    <div key={index} className="border border-gray-300 rounded-md p-4 shadow-sm">
                        <div className="mb-2">
                            <strong>Name:</strong>{" "}
                            {item.isEditable ? (
                                <input
                                type="text"
                                value={item.name}
                                onChange={(e) => updateInvoiceItem(index, "name", e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                item.name
                            )}
                        </div>

                        <div className="mb-2">
                            <strong>Quantity:</strong>{" "}
                            {item.isEditable ? (
                                <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateInvoiceItem(index, "quantity", e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                item.quantity
                            )}
                        </div>

                        <div className="mb-2">
                            <strong>Unit Price:</strong>{" "}
                            {item.isEditable ? (
                                <input
                                type="number"
                                min="0"
                                value={item.unitPrice}
                                onChange={(e) => updateInvoiceItem(index, "unitPrice", e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                `₹${item.unitPrice.toFixed(2)}`
                            )}
                        </div>

                        <div className="mb-2">
                            <strong>Tax %:</strong>{" "}
                            {item.isEditable ? (
                                <input
                                type="number"
                                min="0"
                                max="100"
                                value={item.taxRate}
                                onChange={(e) => updateInvoiceItem(index, "taxRate", e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                `${item.taxRate}%`
                            )}
                        </div>

                        <div className="mb-2">
                            <strong>Total:</strong> ₹{total.toFixed(2)}
                        </div>

                        <div className="mb-2">
                            <strong>Description:</strong>{" "}
                            {item.isEditable ? (
                                <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateInvoiceItem(index, "description", e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                item.description
                            )}
                        </div>

                        <div className="flex justify-end space-x-4 mt-2">
                            <button
                                type="button"
                                onClick={() => toggleItemEditable(index)}
                                className={`text-sm font-medium ${
                                item.isEditable ? "text-green-600" : "text-blue-600"
                                }`}
                            >
                                {item.isEditable ? "✔️" : "Edit"}
                            </button>

                            <button
                                type="button"
                                onClick={() => removeInvoiceItem(index)}
                                className="text-sm text-red-500 font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    );
                })}
            </div>


            <button
                type="button"
                onClick={handleAddItem}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer md:mt-0 mt-[30px]"
            >
                + Add New Item
            </button>

            <div className="mt-6 max-w-md ml-auto space-y-2 text-right">
                <div className="text-gray-700">
                    <span className="font-semibold">Subtotal:</span> ₹ {subtotal.toFixed(2)}
                </div>
                <div className="text-gray-700">
                    <span className="font-semibold">Total Tax:</span> ₹ {tax.toFixed(2)}
                </div>
                <div className="text-xl font-bold">
                    Grand Total: ₹ {grandTotal.toFixed(2)}
                </div>
            </div>
        </>
        
        )}

    </div>
  );
};

export default InvoiceItems;
