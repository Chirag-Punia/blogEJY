import React, { useState } from "react";
import "../styles/Verify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Verify = () => {
  const reactNavigator = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const base_url = "https://blogejy.onrender.com";

  const handleInputChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSendOTP = async () => {
    try {
      await fetch(`${base_url}/auth/sendOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber }),
      }).then((res) => {
        if (res.data === "OTP sent") {
          toast.success("OTP sent successfully");
        }
      });
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerify = async () => {
    try {
      await fetch(`${base_url}/auth/user/verify/ph`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNo: mobileNumber }),
      }).then((res) => {
        if (verificationCode === "54321") {
          toast.success("Verified successfully");
          reactNavigator("/login");
        } else if (res.data === "Not Verified") {
          toast.error("Mobile Number dose not exist");
        } else {
          toast.error("Invalid OTP");
        }
      });
    } catch (error) {
      console.error("Error verifying mobile number:", error);
    }
  };

  return (
    <div className="g1-container">
      <h2 className="g2-title">Mobile Number Verification</h2>
      <label htmlFor="mobileNumber" className="g3-label">
        Mobile Number(Without Country Code and +):
      </label>
      <input
        type="text"
        id="mobileNumber"
        value={mobileNumber}
        onChange={handleInputChange}
        className="g4-input"
      />
      <br />
      {otpSent ? (
        <>
          <label htmlFor="verificationCode" className="g5-label">
            Verification Code:
          </label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            className="g6-input"
          />
          <br />
          <button onClick={handleVerify} className="g7-button">
            Verify
          </button>
          <br />
        </>
      ) : (
        <button onClick={handleSendOTP} className="g8-button">
          Send OTP
        </button>
      )}
      <br />
      {verificationStatus && (
        <p className="g9-status">Verification Status: {verificationStatus}</p>
      )}
    </div>
  );
};
