
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicationNotice({ type }) {

  const navigate = useNavigate();
  const [lang, setLang] = useState("en");

  const isUrdu = lang === "ur";

  // ---------- ROUTES ----------
  const redirect = {
    client: "/dashboard/personal",
    marital: "/certified/meritalCertificate",
    shajrah: "/certified/shajra",
  };

  // ---------- CONTENT ----------
  const content = {
  client: {
    en: {
      title: "Important Application Instructions",
      sections: [
        {
          title: "1. Personal Details",
          points: [
            "Fill all fields carefully and accurately.",
            "Verify all details before clicking the Next button.",
            "All fields are mandatory.",
            "Enter your full name exactly as mentioned on Birth Certificate / TC / Aadhaar.",
            "Upload your latest passport-size photograph."
          ]
        },
        {
          title: "2. Qualification",
          points: [
            "Fill educational details carefully.",
            "All qualification fields are mandatory.",
            "If you never attended school, select 'None'.",
            "Use 'Add More' to enter additional education details."
          ]
        },
        {
          title: "3. Occupation",
          points: [
            "Provide correct occupation details.",
            "All fields are mandatory except Skill / Hobbies and Art Expert.",
            "Optional fields may be filled if applicable."
          ]
        },
        {
          title: "4. Physical Condition",
          points: [
            "Select 'Normal' if physically fit.",
            "Select 'Abnormal' if physically challenged.",
            "All fields are mandatory."
          ]
        },
        {
          title: "5. Marital Status",
          points: [
            "Choose the correct marital status.",
            "No additional details required for Single / Engaged / Prefer not to say.",
            "Civil Partnership is not accepted."
          ]
        },
        {
          title: "6. Bank Details",
          points: [
            "Bank details are collected only for record purposes.",
            "You may skip this section if you wish."
          ]
        },
        {
          title: "7. Father / Guardian / Spouse Details",
          points: [
            "Father: Enter father's name and grandfather's name.",
            "Guardian: Enter guardian's name and their father's name.",
            "Spouse: Enter husband's name and father-in-law's name."
          ]
        },
        {
          title: "8. Grand Parent Details",
          points: [
            "Enter complete details of your grandfather.",
            "All fields are mandatory."
          ]
        },
        {
          title: "9. Payment",
          points: [
            "Payment of Rs. 13 is mandatory.",
            "Pay using UPI ID or QR Code.",
            "Enter Beneficiary Name, Transaction ID and Date.",
            "Payment once made is non-refundable.",
            "Based on the data provided, an ID Card will be created for you.",
            "This ID card will contain a QR Code storing your complete data.",
            "In emergencies or need, this QR code will help you access your information easily.",
            "After successful payment, your ID card will be available in the Certificate Management section within 3 to 7 days."
          ]
        }
      ],
      footer: "Please download and print this form for future reference.",
      btn: "Apply Now"
    },

    hi: {
      title: "महत्वपूर्ण आवेदन निर्देश",
      sections: [
        {
          title: "1. व्यक्तिगत विवरण",
          points: [
            "सभी फ़ील्ड सावधानीपूर्वक और सही तरीके से भरें।",
            "Next बटन पर क्लिक करने से पहले सभी विवरण जांच लें।",
            "सभी फ़ील्ड अनिवार्य हैं।",
            "नाम वही दर्ज करें जो Birth Certificate / TC / Aadhaar में लिखा है।",
            "अपनी नवीनतम पासपोर्ट साइज फोटो अपलोड करें।"
          ]
        },
        {
          title: "2. शैक्षणिक योग्यता",
          points: [
            "शैक्षणिक विवरण ध्यान से भरें।",
            "सभी योग्यता संबंधी फ़ील्ड अनिवार्य हैं।",
            "यदि आपने कभी स्कूल नहीं पढ़ा है तो 'None' चुनें।",
            "'Add More' का उपयोग करके अतिरिक्त शिक्षा विवरण जोड़ें।"
          ]
        },
        {
          title: "3. व्यवसाय",
          points: [
            "व्यवसाय से संबंधित सही जानकारी दें।",
            "Skill / Hobbies और Art Expert को छोड़कर सभी फ़ील्ड अनिवार्य हैं।",
            "वैकल्पिक फ़ील्ड आवश्यकता अनुसार भर सकते हैं।"
          ]
        },
        {
          title: "4. शारीरिक स्थिति",
          points: [
            "यदि आप शारीरिक रूप से स्वस्थ हैं तो 'Normal' चुनें।",
            "यदि शारीरिक रूप से अक्षम हैं तो 'Abnormal' चुनें।",
            "सभी फ़ील्ड अनिवार्य हैं।"
          ]
        },
        {
          title: "5. वैवाहिक स्थिति",
          points: [
            "सही वैवाहिक स्थिति चुनें।",
            "Single / Engaged / Prefer not to say के लिए अतिरिक्त जानकारी आवश्यक नहीं है।",
            "Civil Partnership मान्य नहीं है।"
          ]
        },
        {
          title: "6. बैंक विवरण",
          points: [
            "बैंक विवरण केवल रिकॉर्ड के उद्देश्य से लिया जाता है।",
            "आप चाहें तो इस अनुभाग को छोड़ सकते हैं।"
          ]
        },
        {
          title: "7. पिता / अभिभावक / जीवनसाथी विवरण",
          points: [
            "Father: पिता और दादा का नाम दर्ज करें।",
            "Guardian: अभिभावक और उनके पिता का नाम दर्ज करें।",
            "Spouse: पति और ससुर का नाम दर्ज करें।"
          ]
        },
        {
          title: "8. दादा का विवरण",
          points: [
            "दादा की पूरी जानकारी दर्ज करें।",
            "सभी फ़ील्ड अनिवार्य हैं।"
          ]
        },
        {
          title: "9. भुगतान",
          points: [
            "₹13 का भुगतान अनिवार्य है।",
            "UPI या QR Code के माध्यम से भुगतान करें।",
            "Beneficiary Name, Transaction ID और तारीख दर्ज करें।",
            "एक बार किया गया भुगतान वापस नहीं किया जाएगा।",
            "आपके द्वारा दी गई जानकारी के आधार पर आपका ID कार्ड बनाया जाएगा।",
            "इस ID कार्ड में आपका पूरा डेटा सुरक्षित रखने वाला QR कोड होगा।",
            "आपातकाल या आवश्यकता के समय इस QR कोड से जानकारी प्राप्त की जा सकेगी।",
            "भुगतान के बाद 3 से 7 दिनों में ID कार्ड Certificate Management सेक्शन में उपलब्ध होगा।"
          ]
        }
      ],
      footer: "कृपया इस फॉर्म को डाउनलोड कर प्रिंट अवश्य निकालें।",
      btn: "आवेदन करें"
    },

    ur: {
      title: "اہم درخواست ہدایات",
      sections: [
        {
          title: "1. ذاتی معلومات",
          points: [
            "تمام خانے احتیاط اور درستگی کے ساتھ پُر کریں۔",
            "Next بٹن دبانے سے پہلے تمام معلومات کی جانچ کریں۔",
            "تمام خانے لازمی ہیں۔",
            "نام وہی درج کریں جو برتھ سرٹیفکیٹ / TC / آدھار میں درج ہے۔",
            "اپنی تازہ ترین پاسپورٹ سائز تصویر اپلوڈ کریں۔"
          ]
        },
        {
          title: "2. تعلیمی قابلیت",
          points: [
            "تعلیمی تفصیلات غور سے درج کریں۔",
            "تمام تعلیمی خانے لازمی ہیں۔",
            "اگر آپ نے کبھی اسکول میں تعلیم حاصل نہیں کی تو 'None' منتخب کریں۔",
            "'Add More' کے ذریعے مزید تعلیمی تفصیلات شامل کریں۔"
          ]
        },
        {
          title: "3. پیشہ",
          points: [
            "درست پیشہ ورانہ معلومات فراہم کریں۔",
            "Skill / Hobbies اور Art Expert کے علاوہ تمام خانے لازمی ہیں۔",
            "اختیاری خانے ضرورت کے مطابق پُر کیے جا سکتے ہیں۔"
          ]
        },
        {
          title: "4. جسمانی حالت",
          points: [
            "اگر آپ صحت مند ہیں تو 'Normal' منتخب کریں۔",
            "اگر جسمانی طور پر معذور ہیں تو 'Abnormal' منتخب کریں۔",
            "تمام خانے لازمی ہیں۔"
          ]
        },
        {
          title: "5. ازدواجی حیثیت",
          points: [
            "درست ازدواجی حیثیت منتخب کریں۔",
            "Single / Engaged / Prefer not to say کے لیے مزید معلومات ضروری نہیں۔",
            "Civil Partnership قابل قبول نہیں ہے۔"
          ]
        },
        {
          title: "6. بینک کی تفصیلات",
          points: [
            "بینک کی تفصیلات صرف ریکارڈ کے مقصد کے لیے لی جاتی ہیں۔",
            "اگر چاہیں تو یہ حصہ چھوڑ سکتے ہیں۔"
          ]
        },
        {
          title: "7. والد / سرپرست / شریکِ حیات کی تفصیلات",
          points: [
            "Father: والد اور دادا کا نام درج کریں۔",
            "Guardian: سرپرست اور ان کے والد کا نام درج کریں۔",
            "Spouse: شوہر اور سسر کا نام درج کریں۔"
          ]
        },
        {
          title: "8. دادا کی تفصیلات",
          points: [
            "دادا کی مکمل معلومات درج کریں۔",
            "تمام خانے لازمی ہیں۔"
          ]
        },
        {
          title: "9. ادائیگی",
          points: [
            "13 روپے کی ادائیگی لازمی ہے۔",
            "UPI یا QR Code کے ذریعے ادائیگی کریں۔",
            "Beneficiary Name، Transaction ID اور تاریخ درج کریں۔",
            "ایک بار کی گئی ادائیگی ناقابلِ واپسی ہوگی۔",
            "آپ کے فراہم کردہ ڈیٹا کی بنیاد پر آپ کے لیے ID کارڈ تیار کیا جائے گا۔",
            "اس ID کارڈ میں مکمل معلومات پر مشتمل QR کوڈ ہوگا۔",
            "ایمرجنسی یا ضرورت کے وقت یہ QR کوڈ آپ کی مدد کرے گا۔",
            "ادائیگی کے بعد 3 سے 7 دن میں ID کارڈ Certificate Management سیکشن میں دستیاب ہوگا۔"
          ]
        }
      ],
      footer: "براہ کرم فارم ڈاؤن لوڈ کر کے محفوظ رکھیں اور پرنٹ بھی نکال لیں۔",
      btn: "درخواست دیں"
    }
  }
};

    // ---------------- MARITAL ----------------
    
 marital : {

  en: {
    title: "Important Application Instructions",
    sections: [
      
      {
        title: "1. Marital Certificate",
        points: [
          "Fill all fields carefully and accurately.",
          "After filling all fields, review them and then click the Next button.",
          "All fields are mandatory.",
          "Enter the complete and correct name of the person for whom the certificate is being applied.",
          "Upload a clear image of your signature using the upload button.",
          "A payment of Rs. 38 is mandatory for this service.",
          "Make the payment using the provided UPI ID or QR Code.",
          "Enter the account holder’s name in the Beneficiary Name field.",
          "Enter the payment Transaction ID and date for confirmation.",
          "After clicking Submit, the complete form will be displayed.",
          "If any correction is required, please visit the office.",
          "Payment once made is non-refundable.",
          "Request: Please download and print this form for future reference."
        ]
      }
    ],
    footer: "Please download and print this form for your records.",
    btn: "Apply Now"
  },

  hi: {
    title: "महत्वपूर्ण आवेदन निर्देश",
    sections: [
      
      {
        title: "1. वैवाहिक प्रमाण पत्र",
        points: [
          "सभी फ़ील्ड सावधानीपूर्वक और सही-सही भरें।",
          "सभी फ़ील्ड भरने के बाद विवरण जांचें और फिर Next बटन दबाएं।",
          "सभी फ़ील्ड अनिवार्य हैं।",
          "जिस व्यक्ति के लिए प्रमाणपत्र बनाना है उसका पूरा और सही नाम दर्ज करें।",
          "अपना साफ़ हस्ताक्षर की फोटो अपलोड करें।",
          "इस सेवा के लिए ₹38 का भुगतान अनिवार्य है।",
          "दिए गए UPI ID या QR Code से भुगतान करें।",
          "Beneficiary Name में खाते के धारक का नाम दर्ज करें।",
          "भुगतान का Transaction ID और तारीख दर्ज करें।",
          "Submit पर क्लिक करने के बाद पूरा फॉर्म दिखाई देगा।",
          "यदि कोई सुधार आवश्यक हो तो कार्यालय से संपर्क करें।",
          "भुगतान वापस नहीं किया जाएगा।",
          "अनुरोध: कृपया इस फॉर्म को डाउनलोड कर भविष्य के लिए सुरक्षित रखें।"
        ]
      }
    ],
    footer: "कृपया इस फॉर्म को डाउनलोड कर प्रिंट अवश्य निकालें।",
    btn: "आवेदन करें"
  },

  ur: {
    title: "اہم درخواست ہدایات",
    sections: [
      
      {
        title: "1. ازدواجی سرٹیفکیٹ",
        points: [
          "تمام خانے غور و فکر کے ساتھ پُر کریں۔",
          "تمام خانے پُر کرنے کے بعد انہیں چیک کریں پھر Next بٹن دبائیں۔",
          "تمام خانے لازمی ہیں۔",
          "جس شخص کے لیے سرٹیفکیٹ جاری کیا جا رہا ہے اس کا پورا اور درست نام درج کریں۔",
          "اپنے دستخط کی صاف تصویر اپلوڈ کریں۔",
          "اس سروس کے لیے 38 روپے کی ادائیگی لازمی ہے۔",
          "مہیا کیے گئے UPI ID یا QR Code کے ذریعے ادائیگی کریں۔",
          "Beneficiary Name کے خانے میں کھاتہ دار کا نام لکھیں۔",
          "Transaction ID اور تاریخ درج کریں۔",
          "Submit پر کلک کرنے کے بعد مکمل فارم ظاہر ہوگا۔",
          "اگر کسی تصحیح کی ضرورت ہو تو دفتر سے رجوع کریں۔",
          "کی گئی ادائیگی واپس نہیں ہوگی۔",
          "درخواست: براہ کرم فارم ڈاؤن لوڈ کر کے محفوظ رکھیں اور پرنٹ بھی نکال لیں۔"
        ]
      }
    ],
    footer: "براہ کرم اس فارم کو ڈاؤن لوڈ کریں اور پرنٹ بھی نکال لیں۔",
    btn: "درخواست دیں"
  }

},

    // ---------------- SHAJRAH ----------------
    shajrah:  {
  en: {
    title: "Important Application Instructions",
    sections: [
      {
        title: "1. Shajrah (Family Lineage)",
        points: [
          "Fill all fields carefully and thoughtfully.",
          "Review all details before clicking the Next button.",
          "All fields are mandatory.",
          "Enter your full name first.",
          "Enter the full name of your biological father only.",
          "Continue entering ancestor names (minimum four generations).",
          "Upload ID proof for at least four ancestors.",
          "Payment of Rs. 28 is mandatory.",
          "Pay via UPI ID or QR Code.",
          "Enter Beneficiary Name, Transaction ID and Date.",
          "Payment once made is non-refundable."
        ]
      },
      
    ],
    footer: "Please download and print this form for your records.",
    btn: "Apply Now"
  },

  hi: {
    title: "महत्वपूर्ण आवेदन निर्देश",
    sections: [
      {
        title: "1. शजरा (वंशावली)",
        points: [
          "सभी विवरण सावधानीपूर्वक भरें।",
          "Next बटन दबाने से पहले जांच करें।",
          "सभी फ़ील्ड अनिवार्य हैं।",
          "अपना पूरा नाम दर्ज करें।",
          "केवल वास्तविक पिता का नाम दर्ज करें।",
          "कम से कम चार पीढ़ियों के नाम दर्ज करें।",
          "चार पूर्वजों के ID प्रूफ अपलोड करें।",
          "₹28 का भुगतान अनिवार्य है।",
          "UPI या QR Code से भुगतान करें।",
          "Beneficiary Name, Transaction ID और तारीख भरें।",
          "भुगतान वापस नहीं होगा।"
        ]
      },
      
    ],
    footer: "कृपया इस फॉर्म को डाउनलोड कर प्रिंट अवश्य निकालें।",
    btn: "आवेदन करें"
  },

  ur: {
    title: "اہم درخواست ہدایات",
    sections: [
      {
        title: "1. شجرہ (خاندانی نسب)",
        points: [
          "تمام خانے غور سے پُر کریں۔",
          "Next بٹن دبانے سے پہلے جانچ کریں۔",
          "تمام خانے لازمی ہیں۔",
          "اپنا پورا نام درج کریں۔",
          "صرف حقیقی والد کا نام درج کریں۔",
          "کم از کم چار نسلوں کے نام درج کریں۔",
          "چار دادا کے شناختی ثبوت اپلوڈ کریں۔",
          "28 روپے کی ادائیگی لازمی ہے۔",
          "UPI یا QR Code کے ذریعے ادائیگی کریں۔",
          "Beneficiary Name، Transaction ID اور تاریخ درج کریں۔",
          "ادائیگی واپس نہیں ہوگی۔"
        ]
      },
      
    ],
    footer: "براہِ کرم اس فارم کو ڈاؤن لوڈ کریں اور پرنٹ ضرور کریں۔",
    btn: "درخواست دیں"
  }
},
  };

  const current = content[type]?.[lang] || content.client.en;

  return (
    <div className="min-h-screen bg-pure-greys-5 flex justify-center py-10 px-4">

      <div
        className={`max-w-4xl w-full bg-white rounded-2xl shadow-xl border p-8 relative 
        ${isUrdu ? "text-right" : "text-left"}`}
        dir={isUrdu ? "rtl" : "ltr"}
      >

        {/* LANGUAGE SWITCH */}
        <div className="flex justify-center gap-3 mb-6">
          {["en", "hi", "ur"].map(code => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`px-4 py-1 rounded-full border text-sm
                ${lang === code ? "bg-blue-200" : "bg-pure-greys-50"}`}
            >
              {code === "en" && "English"}
              {code === "hi" && "हिंदी"}
              {code === "ur" && "اردو"}
            </button>
          ))}
        </div>

        {/* TITLE */}
        <h1 className="text-xl text-center font-bold underline mb-4">
          {current.title}
        </h1>

        {/* CONTENT BOX */}
        <div className="bg-richblack-600 border rounded-xl p-5 space-y-4">

          {current.sections.map((section, i) => (
            <div key={i} className="bg-white p-4 rounded-xl">
              <h2 className="font-bold mb-2">{section.title}</h2>

              <ul className={`list-disc ${isUrdu ? "mr-6" : "ml-6"}`}>
                {section.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}

        </div>

        {/* FOOTER */}
        <p className="mt-3 text-center text-sm">{current.footer}</p>

        {/* BUTTON */}
        <button
          onClick={() => navigate(redirect[type])}
          className="mt-6 w-full bg-caribbeangreen-200 py-3 rounded-xl font-semibold"
        >
          {current.btn}
        </button>

      </div>
    </div>
  );
}
