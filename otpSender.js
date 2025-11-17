import axios from "axios";

export const sendOTP = async (mobile, otp) => {
  try {
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        route: "q",
        message: `Your OTP for verification is ${otp}`,
        language: "english",
        flash: "0",
        numbers: mobile,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ OTP Sending Error:", error.response?.data || error.message);
    throw new Error("Failed to send OTP");
  }
};
