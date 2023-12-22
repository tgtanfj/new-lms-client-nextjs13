"use client";

import { styles } from "@/app/styles/style";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

interface VerifycationProps {
  setRoute: (route: string) => void;
}

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verifycation = ({ setRoute }: VerifycationProps) => {
  const [invalidError, setInvalidError] = useState(false);
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated success");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verifycationNumber = Object.values(verifyNumber).join("");
    if (verifycationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verifyNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      // decrease 1 when delete
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      // increase 1 when click any number
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="text-black dark:text-white">
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted className="text-white" size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="1100px:w-[70%] m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center 
          ${
            invalidError
              ? "shake border-red-500"
              : "dark:border-white border-[#0000004a]"
          }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button onClick={verificationHandler} className={`${styles.button}`}>
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px]">
        Go back to sign in?{" "}
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verifycation;
