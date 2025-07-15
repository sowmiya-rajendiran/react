## 🧾 Invoice Builder (React)
- A simple and responsive invoice generator built with React + Tailwind CSS, supporting:
- Dynamic item entry with calculations
- Mobile-responsive layout
- LocalStorage persistence
- PDF download using html2pdf.js

## 🚀 Features
- ✍️ Add, edit, and delete invoice line items
- 💾 Save data locally (persists after page refresh)
- 📄 Download invoice as a formatted PDF
- ✅ Real-time total, tax, and grand total calculations
-📱 Mobile-optimized card view for invoice items

## 🛠 Tech Stack
- React (Function Components)
- Tailwind CSS
- html2pdf.js
- LocalStorage
- Context API

## How It Works
1. Form State Management
    - Uses React Context API (FormContext.js) to manage:
    - Sender details
    - Customer details
    - Invoice items
    - useFormContext hook is used in all components to read/write shared state.
2. Local Storage Persistence
    - All form data (formData) and invoice items (invoiceItems) are automatically:
    - Loaded from localStorage on page load
    - Saved to localStorage on every change
3. Adding & Editing Items
    - Users can dynamically add invoice rows.
    - Each item supports:
    - Name, Quantity, Unit Price, Tax %, and Description
    - Real-time total calculation per row
    - An "Edit / ✔️" toggle enables switching between view and edit modes.
4. Responsive Layout
    - Desktop: Items are displayed in a traditional HTML table
    - Mobile: The same data is shown in stacked card-style layout using Tailwind’s md:hidden and md:table classes.
5. PDF Generation
    - Clicking "Download PDF":
    - Validates all fields
    - Renders a hidden printable layout using ref
    - Uses html2pdf.js to generate and download the invoice

## Deployed Link
- 