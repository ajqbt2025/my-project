// import { toast } from "react-hot-toast";
// import rzpLogo from "../../assests/Logo.png";
// import { apiConnector } from "../apiConnector";
// import { clienPaymenttAPI } from "../api";

// const {
//   CLIENT_PAYMENT_API,
//   CLIENT_VERIFY_API,
// } = clienPaymenttAPI;

// // Load Razorpay SDK
// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// // ================= CLIENT PAYMENT =================
// export async function PayClient(
//   token,
//   client,
//   user_details,
//   navigate
// ) {
//   const toastId = toast.loading("Opening payment gateway...");

//   try {
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       toast.error("Razorpay SDK failed to load");
//       return;
//     }

//     // ✅ CREATE ORDER (NO clientId, NO amount from frontend)
//     const orderResponse = await apiConnector(
//       "POST",
//       CLIENT_PAYMENT_API,
//       {}, // 🔥 EMPTY BODY
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!orderResponse.data.success) {
//       throw new Error("Order creation failed");
//     }

//     // ✅ CORRECT RESPONSE ACCESS
//     const { amount, currency, id } = orderResponse.data.order;

//     // Razorpay options
//     const options = {
//       key: process.env.REACT_APP_RAZORPAY_KEY,
//       amount,
//       currency,
//       order_id: id,
//       name: "Client Registration",
//       description: "Client registration fee payment",
//       image: rzpLogo,
//       prefill: {
//         name: `${user_details.firstName} ${user_details.lastName}`,
//         email: user_details.email,
//       },

//       // 🔥 PAYMENT SUCCESS
      
//       handler: async function (rp) {
//   console.log("RAZORPAY RAW RESPONSE 👉", rp);
//   console.log("CLIENT FROM REDUX 👉", client);

//   await verifyClientPayment(
//     {
//       razorpay_order_id: rp.razorpay_order_id,
//       razorpay_payment_id: rp.razorpay_payment_id,
//       razorpay_signature: rp.razorpay_signature,

//       // ⚠️ IMPORTANT
//       client: {
//         personalDetailsId: client?.personalDetailsId,
//         qualificationId: client?.qualificationId,
//         occupationId: client?.occupationId,
//         physicalConditionId: client?.physicalConditionId,
//         maritalStatusId: client?.maritalStatusId,
//         fatherGuardianId: client?.fatherGuardianId,
//         grandParentId: client?.grandParentId,
//         bankDetailsId: client?.bankDetailsId,
//       },
//     },
//     token,
//     navigate
//   );
// }

//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//     paymentObject.on("payment.failed", () => {
//       toast.error("Payment failed. Please try again.");
//     });
//   } catch (error) {
//     console.error("CLIENT PAYMENT ERROR:", error);
//     toast.error("Payment failed");
//   }

//   toast.dismiss(toastId);
// }

// // ================= VERIFY CLIENT PAYMENT =================
// async function verifyClientPayment(bodyData, token, navigate) {
//   const toastId = toast.loading("Verifying payment...");
//   try {
//     const response = await apiConnector(
//       "POST",
//       CLIENT_VERIFY_API,
//       bodyData,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (response.data.success) {
//       toast.success("Payment successful 🎉");
//       navigate("/client/payment-success");
//     } else {
//       toast.error("Payment verification failed");
//     }
//   } catch (error) {
//     console.error("VERIFY CLIENT PAYMENT ERROR:", error);
//     toast.error("Could not verify payment");
//   }
//   toast.dismiss(toastId);
// }



import { toast } from "react-hot-toast";
import rzpLogo from "../../assests/Logo.png";
import { apiConnector } from "../apiConnector";
import { clienPaymenttAPI } from "../api";

const {
 CLIENT_PAYMENT_API,
  CLIENT_VERIFY_API,
  PAYMENT_CREATE_API,
  PAYMENT_SUMMARY_API,
  CONTACT_SAVE_API,
  CONTACT_GET_ALL_API,
  GET_ALL_PAYMENT
} = clienPaymenttAPI;

export const saveContactMessageService = async (data, token) => {
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      CONTACT_SAVE_API,
      data,
      {
        Authorization: `Bearer ${token || ""}`,
      }
    );

    if (!response?.data?.success) {
      toast.error(response?.data?.message || "Failed to send message");
      return null;
    }

    toast.success("Message sent successfully");
    result = response.data;

  } catch (error) {
    console.log("CONTACT SAVE ERROR =>", error);
    toast.error("Server error while sending message");
  }

  return result;
};


// 🟣 Get All Contact Messages (Admin)
export const getAllContactMessagesService = async (token) => {
  let result = null;

  try {
    const response = await apiConnector(
      "GET",
      CONTACT_GET_ALL_API,
      null,
      {
        Authorization: `Bearer ${token || ""}`,
      }
    );

    if (!response?.data?.success) {
      toast.error("Failed to load messages");
      return null;
    }

    result = response.data;

  } catch (error) {
    console.log("GET CONTACT LIST ERROR =>", error);
    toast.error("Unable to fetch messages");
  }

  return result;
};



export const createPaymentService = async (paymentData) => {
  const toastId = toast.loading("Saving payment...");

  try {
    const response = await apiConnector(
      "POST",
      PAYMENT_CREATE_API,
      paymentData
    );
    console.log("PAYMENT CREATE ",response)
    toast.success("Payment created successfully");

    return response.data;
  } catch (error) {
    console.log("PAYMENT CREATE ERROR =>", error);

    toast.error(
      error?.response?.data?.message || "Payment creation failed"
    );

    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
export const getAllPaymentService = async () => {
  const toastId = toast.loading("Fetching payments...");

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_PAYMENT
    );

    console.log("GET ALL PAYMENTS =>", response);

    return response.data;
  } catch (error) {
    console.log("GET ALL PAYMENT ERROR =>", error);

    toast.error(
      error?.response?.data?.message || "Failed to fetch payments"
    );

    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

export const getPaymentSummaryService = async () => {
  try {
    const res = await apiConnector("GET", PAYMENT_SUMMARY_API);
    console.log("PAYMENT_SUMMARY_API RES...",res)
    return res.data;
  } catch (err) {
    return null;
  }
};
