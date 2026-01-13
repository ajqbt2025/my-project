
import React from "react";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/Homepage/HighlightText";
import Footer from "../components/common/Footer"
const AboutUs = () => {
  return (
    <div className="bg-richblack-900 text-richblack-25 min-h-screen">

      {/* ========== HERO SECTION ========== */}
      <section className="w-full bg-gradient-to-b from-richblack-800 to-richblack-900 py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-caribbeangreen-100 font-semibold text-sm">
            بسم اللہ الرحمن الرحیم
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
            <HighlightText text="Al-Jamiyatul Quresh Fraternity" />
          </h1>

          <p className="text-richblack-200 max-w-2xl mx-auto mt-3 text-lg">
            A digital initiative for unity, development & welfare of the Quresh community
          </p>
        </div>
      </section>


      {/* ========== URDU PURPOSE BLOCK ========== */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-richblack-800 border border-richblack-700 rounded-2xl shadow-[0_0_25px_#00000040] p-6">

          <div className="text-center mb-4 text-[40px]">
            <HighlightText text="(ہدف)" />
          </div>

          <p
            className="
              font-urdu leading-8 text-[15px]
              text-richblack-25
              text-justify
              tracking-wide
            "
            dir="rtl"
          >
           السلام علیکم ورحمۃ اللہ و برکاته آپ کو یہ اطلاع دیتے ہوئے ہمیں بڑی
              مسرت ہو رہی ہے کہ الجمعیت القریش برادری، تار کهیرہ، امراوتی کے طرف
              سے ایک معاشرتی مناسبت سے برادری کے کام کاج اور دیگر ضروریات کو مد
              نظر رکھتے ہوئے یہ طے کیا کہ ایک نوجوان لوگوں کی جماعت منظم کی جائے
              تاکہ ہمارے قریش خاندان کے معاشرے کے منفی ماحول کو درست کیا جائے،
              اور اسی طرح سے ہمارے کاروبار کو کیسے منظم کیا جائے، ہمارے اسٹوڈنٹ
              جو آگے پڑھنا چاہتے ہیں ان کی رہنمائی کیسے کی جائے اور بھی چند
              مقاصد ہیں جو درج ذیل ہیں۔ ۱۔ سب سے ضروری معلومات لیکر انھیں ایک
              آئی ڈی کارڈ دیا جائے گا جو گارمنٹ کے ڈاکومینٹس سے لنک ہو گا۔ اگر
              اس فرد کو ایمرجنسی میں کسی بھی کارڈ کی ضرورت ہو گی تو اس کارڈ کے
              پیچھے QR کوڈ ہو گا جسے اسکین کر کے وہ اپنی ضروری کاغذ کی پرنٹ نکال
              سکے گا اور ہماری سوسائٹی کے دیگر اسکیموں سے بھی فائدہ اٹھا سکے گا،
              مثلا دواخانے کی ضروریات میں کنسیشن، کاروبار کے لیے قرض وغیرہ۔ ۲۔
              ہمارے مقصد میں اپنے برادری کے لیے بینک کھولنا بھی شامل ہے، ہم اپنے
              کسٹمر سے ڈیلی بیس پر پیسے جمع کریں گے اور ہم ان سے کوئی چارج نہیں
              لیں گے، صرف سروس چارج ہی لینگے۔ جب بھی کوئی کسٹمر اپنے پورے پیسے
              نکالنا چاہے گا ہم بلا جھجک واپس کر دیں گے۔ ۳۔ ہسپتال کی ضرورت پوری
              کرنا، کاروبار کو صحیح نہج کے مطابق امداد کرنا، اسٹوڈنٹ کیلئے
              اسکالرشپ، کیریئر گائیڈنس، یتیم، بیوہ، مظلوم کی مالی و جانی تعاون
              کرنا۔ ہم قصوروار مجرم کی صرف کورٹ کچہری، پولیس اسٹیشن تک رہنمائی
              کریں گے، ناکہ پوری طرح سے خلاصی کروائیں گے۔ ۴۔ اجتماعی شادیوں کا
              نظم بھی کریں گے جس میں ہم دولہا و دلہن والوں کو آدھی ضرورت کا ذمہ
              دار بنائیں گے، وہ اپنی مرضی سے جس چیز کے بھی ذمہ دار بنیں، آدھی
              قیمت یا آدھا سامان وہ ان کی ذمہ داری ہو گی۔ ۵۔ سرکاری کاغذات
              بنوانا (راشن کارڈ، الیکشن کارڈ، کاسٹ سرٹیفیکیٹ وغیرہ)۔ ان سب چیزوں
              کو مدنظر رکھتے ہوئے ہم نے اس سوسائٹی کے لیے ویب سائٹ بنائی ہے جس
              میں یہ ساری سہولیات موجود ہوں گی، مزید نسب نامہ، نکاح نامہ وغیرہ
              بھی حاصل کیے جا سکیں گے۔ ہم پروردگار سے قوی امید رکھتے ہیں کہ آپ
              ہمارے اس مقصد میں شامل ہو کر اس مشن کو مکمل اور منظم کرنے میں
              ہمارا ساتھ دیں گے اور ہمارے اس دعوت کو قبول فرما کر شکریہ کا موقع
              عنایت فرمائیں گے۔ 
          </p>
        </div>
      </section>


      {/* ========== WHO WE ARE + MISSION BOXES ========== */}
      <section className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-2 gap-8">

        {/* LEFT TEXT */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-50 mb-3">
            Who We Are
          </h2>

          <p className="text-richblack-200 leading-7 mb-4">
            <span className="text-yellow-100 font-semibold">
              Al-Jamiyatul Quresh Fraternity
            </span>{" "}
            is a community-driven organization focused on unity, education and
            welfare. Our digital platform connects members and simplifies processes.
          </p>

          <p className="text-richblack-200 leading-7">
            This project is compiled under the guidance of
            <span className="text-yellow-100 font-semibold"> Khalid Ahmad</span>.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-richblack-800 rounded-2xl p-6 border border-richblack-700 shadow">

          <h3 className="text-xl font-semibold text-caribbeangreen-100 mb-3">
            Our Vision & Mission
          </h3>

          <ul className="space-y-2 text-richblack-200 text-sm">
            <li>✔ Strengthen community unity & identity</li>
            <li>✔ Support education, guidance & scholarships</li>
            <li>✔ Provide digital membership & document access</li>
            <li>✔ Promote welfare activities and social support</li>
          </ul>
        </div>
      </section>


      {/* ========== COMPILER SECTION ========== */}
      <section className="bg-richblack-800 py-10 text-center mt-6">

        <h2 className="text-2xl font-semibold text-yellow-50">
          Meet the Compiler
        </h2>

        <p className="text-richblack-200 mt-2">
          <span className="text-yellow-100 font-semibold">
            Khalid Ahmad
          </span>{" "}
          — visionary behind this initiative
        </p>

        <Link
          to="/contact"
          className="inline-block mt-4 bg-yellow-50 text-black font-semibold px-6 py-2 rounded-xl hover:bg-yellow-100 transition"
        >
          Contact Us
        </Link>
      </section>

      <Footer/>
    </div>
  );
};

export default AboutUs;
