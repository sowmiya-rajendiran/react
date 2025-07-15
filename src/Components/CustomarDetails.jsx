import { useFormContext } from "../Context/FormContext";

function CustomarDetails(){

    const { formData, updateFormData } = useFormContext();
    
    return(
        <div>
            <h1 className="text-[18px] font-semibold mb-[25px] mt-[25px] text-[#384259]">Customar Details</h1>
           <div className="grid md:grid-cols-3 grid-cols-2 gap-[25px]">
                <div>
                    <label htmlFor="customar_name" className="mr-[20px]">Name</label> <br></br>
                    <input type="text" 
                        id="customar_name" 
                        required
                        name="customarName"
                        value={formData.customarName}
                        onChange={(e) => updateFormData(e.target.name, e.target.value)}
                        className="w-full border border-[#ced4da] px-[16px] py-[15px] rounded-[4px] focus:border-blue-500 focus:outline-none mt-[10px] h-[40px]">
                    </input>
                </div>
                 <div>
                    <label htmlFor="customar_email" className="mr-[20px]">Email</label> <br></br>
                    <input type="email" 
                        id="customar_email"
                        required 
                        name="customarEmail"
                        value={formData.customarEmail}
                        onChange={(e) => updateFormData(e.target.name, e.target.value)}
                        className="w-full border border-[#ced4da] px-[16px] py-[15px] rounded-[4px] focus:border-blue-500 focus:outline-none mt-[10px] h-[40px]">
                    </input>
                </div>
                <div>
                    <label htmlFor="customar_address" className="mr-[20px]">Address </label> <br></br>
                    <input type="text"  
                        id="customar_address" 
                        required
                        name="customarAddress"
                        value={formData.customarAddress}
                        onChange={(e) => updateFormData(e.target.name, e.target.value)}
                        className="w-full border border-[#ced4da] px-[16px] py-[15px] rounded-[4px] focus:border-blue-500 focus:outline-none mt-[10px] h-[40px]">
                    </input>
                </div>
            </div>
        </div>
    )
}
export default CustomarDetails;