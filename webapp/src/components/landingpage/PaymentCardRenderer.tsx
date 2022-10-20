/**
 * Created By: Rupan Chaulagain
 * Date: 2022-10-19
 * Time: 07:51
 * Project: formintegratorwebapp
 * Organization: Sireto Technology
 */
import ButtonRenderer from "@app/components/ui/ButtonRenderer";
import {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import FormRenderer from "@app/components/ui/FormRenderer";
import FormInput from "@app/components/ui/FormInput";

export default function PaymentCardRenderer(props:any) {
    const {title, description,amount,plan,type} = props;

    const [renderDialog,setRenderDialog] = useState(false);

    const [formFields, setFormFields] = useState({
        firstname: "",
        lastname: "",
        email: "",
    });

    function CardHeader() {
        return (
            <>
                <div className="flex justify-between item-baseline ">
                    <span className={`text-3xl ${props.recommended? "text-[#007AFF]":""} font-semibold`}>{title}</span>
                    {props.recommended && <span className={"p-2 border-1 rounded-full text-sm bg-[#007AFF] font-normal"}>Popular</span>}
                </div>
                <p className={`font-light ${props.recommended? "text-white":"text-gray-500"} sm:text-md`}>{description}</p>
            </>
        );
    }

    function Pricing() {
        return (
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-6xl font-bold">{amount}</span>
                <span className={`${props.recommended?"text-white":"text-gray-500"}`}>/{plan}</span>
            </div>
        );
    }

    function GetStartedButton() {
        const onClick = () => {
            setRenderDialog(true)
        }
        return (
            <ButtonRenderer onClick={onClick}>
                {!!props.buttonTitle? props.buttonTitle: "Get Started"}
            </ButtonRenderer>
        );
    }

    function FeatureListRenderer(props:any){
        return(
            <li className={"flex items-center space-x-3"}>
                {!props.nocheckmark && <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"></path>
                </svg>}
                {props.children}
            </li>
        )
    }

    function PlanFeatures() {
        return (
            <ul role="list" className="mt-3 mb-8 space-y-4 text-left">
                <FeatureListRenderer nocheckmark={true}>
                    <h3 className=' text-lg font-bold'>Features</h3>
                    <p></p>
                </FeatureListRenderer>
                {props.features.map((feature:string,index:number) => (
                    <FeatureListRenderer key={index}>
                        <span>{feature}</span>
                    </FeatureListRenderer>
                ))}
            </ul>
        );
    }

    const handleAllFieldChanges = (id: string, value: any, validateInput: any) => {
        setFormFields({...formFields, [id]: value});
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const bodyContent = {
            "first_name": formFields.firstname,
            "last_name": formFields.lastname,
            "email": formFields.email,
            "plan":type
        }

        try {
            const res = await fetch(`http://localhost:8000/users/plan`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyContent),
            });
            alert("success")
        } catch (e: any) {
            alert("Something went wrong!")
        }
    }

    function PopupDialog(){
        return(
                <Dialog open={renderDialog} onClose={()=>setRenderDialog(false)}>
                    <DialogTitle>Personal Details</DialogTitle>
                    <DialogContent>
                        <FormRenderer handleSubmit={handleSubmit} shouldButtonDisable={false}>
                            <div className={"flex mb-4 gap-3"}>
                                <FormInput
                                    label={"Your First Name"}
                                    placeholder={"Enter your first name"}
                                    id={"firstname"}
                                    handleChange={handleAllFieldChanges}
                                />
                                <FormInput
                                    label={"Your Last Name"}
                                    placeholder={"Enter your last name"}
                                    id={"lastname"}
                                    handleChange={handleAllFieldChanges}
                                />
                            </div>
                            <FormInput
                                label={"Email Address"}
                                placeholder={"Enter your email address"}
                                id={"email"}
                                handleChange={handleAllFieldChanges}
                            />
                        </FormRenderer>
                    </DialogContent>
                </Dialog>
        );
    }

    const shouldSubmitButtonDisable = () => {
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return !formFields.email.match(pattern);
    }

    return (
        <div className={`flex flex-col w-full p-6 mx-auto max-w-lg text-start ${props.recommended? "bg-[#333333] text-white":"bg-white text-dark"} rounded-3xl shadow-lg`}>
            {/*{renderDialog && <PopupDialog/>}*/}
            <Dialog open={renderDialog} onClose={()=>setRenderDialog(false)}>
                <DialogTitle>Personal Details</DialogTitle>
                <DialogContent>
                    <FormRenderer handleSubmit={handleSubmit} shouldButtonDisable={shouldSubmitButtonDisable()}>
                        <div className={"flex mb-4 gap-3"}>
                            <FormInput
                                label={"Your First Name"}
                                placeholder={"Enter your first name"}
                                id={"firstname"}
                                handleChange={handleAllFieldChanges}
                            />
                            <FormInput
                                label={"Your Last Name"}
                                placeholder={"Enter your last name"}
                                id={"lastname"}
                                handleChange={handleAllFieldChanges}
                            />
                        </div>
                        <FormInput
                            label={"Email Address"}
                            placeholder={"Enter your email address"}
                            id={"email"}
                            handleChange={handleAllFieldChanges}
                        />
                    </FormRenderer>
                </DialogContent>
            </Dialog>
            <CardHeader/>
            <Pricing/>
            <GetStartedButton/>
            <PlanFeatures/>
        </div>
    )
}