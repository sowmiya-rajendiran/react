import { useFormContext } from "../Context/FormContext";

function SenderDetails(){

    const { formData, updateFormData } = useFormContext();

    return(
        <div>
            <h1 className="text-[18px] font-semibold mb-[25px] text-[#384259]">Sender Details</h1>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-[25px]">
                <div>
                    <label htmlFor="sender_name" className="mr-[20px]">Name</label> <br></br>
                    <input type="text" 
                        id="sender_name" 
                        required 
                        name="senderName"
                        value={formData.senderName}
                        onChange={(e) => updateFormData(e.target.name, e.target.value)}
                        className="w-full border border-[#ced4da] px-[16px] py-[15px] rounded-[4px] focus:border-blue-500 focus:outline-none mt-[10px] h-[40px]">
                    </input>
                </div>
                 <div>
                    <label htmlFor="sender_email" className="mr-[20px]">Email</label> <br></br>
                    <input type="email" 
                        id="sender_email" 
                        required 
                        name="senderEmail"
                        value={formData.senderEmail}
                        onChange={(e) => updateFormData(e.target.name, e.target.value)}
                        className="w-full border border-[#ced4da] px-[16px] py-[15px] rounded-[4px] focus:border-blue-500 focus:outline-none mt-[10px] h-[40px]">
                    </input>

                </div>
                <div>
                    <label htmlFor="sender_address" className="mr-[20px]">Address </label> <br></br>
                    <input type="text"  
                        id="sender_address" 
                        required
                        name="senderAddress"
                        value={formData.senderAddress}
                        onChange={(e) => updateFormData(e.target.name, e.target.value)}

                        className="w-full border border-[#ced4da] px-[16px] py-[15px] rounded-[4px] focus:border-blue-500 focus:outline-none mt-[10px] h-[40px]">
                    </input>
                </div>
               
            </div>
        </div>
    )
    
}
export default SenderDetails;